import { SmsProvider } from '../interfaces/sms-provider.interface';
import { SendSmsDTO } from '../../dtos';

export class TwilioProvider implements SmsProvider {
  sendSms(dto: SendSmsDTO): Promise<void> {
    const { authUserId, smsDTO } = dto;
    console.info(`SMS send initialized by ${authUserId}`);
    console.info(
      `Sending SMS to ${smsDTO.to}: ${smsDTO.text} using TwilioProvider`,
    );
    return Promise.resolve();
  }
}
