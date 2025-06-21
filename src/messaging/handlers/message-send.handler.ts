import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessageSendEvent } from '../events/message-send.event';
import { MessagingService } from '../messaging.service';

@Injectable()
export class MessageSendHandler {
  constructor(private messagingService: MessagingService) {}

  @OnEvent('message.send')
  async handle(payload: MessageSendEvent) {
    console.log('MessageSendHandler', payload);
    await this.messagingService.sendMessage(payload);
  }
}
