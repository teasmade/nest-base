// messaging.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SmsProvider } from './channels/sms/providers/interfaces/sms-provider.interface';
// import { BaseSmsDTO } from './channels/sms/dtos/sms.dto';
import { SendSmsDTO } from './channels/sms/dtos';
import { MessageSendEvent } from './events/message-send.event';
import { MessageTemplateService } from './content/message-template.service';
@Injectable()
export class MessagingService {
  constructor(
    @Inject('SmsProvider')
    private readonly smsProvider: SmsProvider,
    private readonly messageTemplateService: MessageTemplateService,
  ) {}

  async sendSms(dto: SendSmsDTO) {
    await this.smsProvider.sendSms(dto);
  }

  // async sendEmail(dto: SendEmailDTO) {
  //   await this.emailProvider.sendEmail(dto);
  // }

  async sendMessage(payload: MessageSendEvent) {
    const { templateId, recipient, data, triggerMetadata } = payload;

    // TODO: Implement message sending logic
    // This will involve:
    // 1. Fetching the template from the database
    // 2. Rendering the template with the data
    // 3. Sending the message via the appropriate channel (SMS, email, etc.)
    // 4. Handling errors and retries
    // 5. Logging and tracking the message status

    const template = await this.messageTemplateService.findOne(templateId);

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return '';
  }
}
