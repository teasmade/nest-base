import { SmsProvider } from '../interfaces/sms-provider.interface';
import { SmsDTO } from '../../dtos/sms.dto';

export class TwilioProvider implements SmsProvider {
  sendSms(dto: SmsDTO): Promise<void> {
    console.info(`Sending SMS to ${dto.to}: ${dto.text} using TwilioProvider`);
    return Promise.resolve();
  }
}
