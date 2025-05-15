import { SmsDTO } from '../../dtos/sms.dto';

export interface SmsProvider {
  sendSms(dto: SmsDTO): Promise<void>;
}
