import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '../auth/interfaces';
import { MessageSendEvent } from './events/message-send.event';
import { SendMessageDto } from './dtos/send-message.dto';

@Controller('messaging')
@UseGuards(JwtAuthGuard)
export class MessagingController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Post('send')
  sendMessage(
    @Body(new ValidationPipe()) sendMessageDto: SendMessageDto,
    @Request() req: { user: AuthUser },
  ): { messageId: string; status: string } {
    const { templateId, recipient, data = {} } = sendMessageDto;

    const now = new Date();
    const timestamp = now.toISOString();

    // Create trigger metadata with user context
    const triggerMetadata: Record<string, any> = {
      triggerSource: 'api_endpoint',
      triggeredBy: 'user',
      triggeredById: req.user.id,
      userId: req.user.id,
      timestamp,
    };

    // Create the message send event
    const messageEvent = new MessageSendEvent(
      templateId,
      recipient,
      data,
      triggerMetadata,
    );

    // Emit the event
    this.eventEmitter.emit('message.send', messageEvent);

    // Generate a temporary message ID (in a real implementation, this would come from the message send entity)
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      messageId,
      status: 'queued',
    };
  }
}
