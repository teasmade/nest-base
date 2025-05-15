import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { SmsModule } from './channels/sms/sms.module';
import { EmailModule } from './channels/email/email.module';

@Module({
  imports: [SmsModule, EmailModule],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
