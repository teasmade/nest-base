import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { SmsModule } from './channels/sms/sms.module';
import { EmailModule } from './channels/email/email.module';
import { MessageContentModule } from './content/message-content.module';

@Module({
  imports: [SmsModule, EmailModule, MessageContentModule],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
