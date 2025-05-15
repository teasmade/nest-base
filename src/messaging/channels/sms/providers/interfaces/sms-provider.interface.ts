import { SendSmsDTO } from '../../dtos';

export interface SmsProvider {
  sendSms(dto: SendSmsDTO): Promise<void>;
}
