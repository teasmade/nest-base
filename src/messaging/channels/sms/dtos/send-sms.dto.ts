import { SmsDTO } from './sms.dto';

export class SendSmsDTO {
  authUserId: string;
  smsDTO: SmsDTO;
}
