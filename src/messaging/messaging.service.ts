// messaging.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { SmsProvider } from './channels/sms/providers/interfaces/sms-provider.interface';
// import { BaseSmsDTO } from './channels/sms/dtos/sms.dto';
import { SmsDTO } from './channels/sms/dtos/sms.dto';
@Injectable()
export class MessagingService {
  constructor(
    @Inject('SmsProvider')
    private readonly smsProvider: SmsProvider,
  ) {}

  async sendSms(dto: SmsDTO) {
    await this.smsProvider.sendSms(dto);
  }
}
