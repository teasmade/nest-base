import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { SmsModule } from './channels/sms/sms.module';
import { EmailModule } from './channels/email/email.module';
import { MessageContentModule } from './content/message-content.module';
import { MessagingController } from './messaging.controller';
import { MessageSendHandler } from './handlers/message-send.handler';

@Module({
  imports: [SmsModule, EmailModule, MessageContentModule],
  controllers: [MessagingController],
  providers: [MessagingService, MessageSendHandler],
})
export class MessagingModule {}
