// messaging.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { SmsProvider } from './channels/sms/providers/interfaces/sms-provider.interface';
// import { BaseSmsDTO } from './channels/sms/dtos/sms.dto';
import { SendSmsDTO } from './channels/sms/dtos';
@Injectable()
export class MessagingService {
  constructor(
    @Inject('SmsProvider')
    private readonly smsProvider: SmsProvider,
  ) {}

  async sendSms(dto: SendSmsDTO) {
    await this.smsProvider.sendSms(dto);
  }
}
