import { Injectable } from '@nestjs/common';
import { SmsProvider } from '../interfaces/sms-provider.interface';
import { HttpService } from '@nestjs/axios';
// import { firstValueFrom } from 'rxjs';
import { SmsModeBody } from './interfaces/smsmode-body.interface';
import { SendSmsDTO, SmsDTO } from '../../dtos';
@Injectable()
export class SmsModeProvider implements SmsProvider {
  constructor(private readonly httpService: HttpService) {}

  async sendSms(dto: SendSmsDTO): Promise<void> {
    const { authUserId, smsDTO } = dto;
    console.info(`SMS send initialized by ${authUserId}`);
    console.info(
      `Sending SMS to ${smsDTO.to}: ${smsDTO.text} using SmsModeProvider`,
    );

    /*
    const body = this.buildSmsModeBody(dto);
    
    const testBody: SmsModeBody = {
      recipient: {
        to: 'XYZ',
      },
      body: {
        text: 'API Test',
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          process.env.SMSMODE_BASE_URL + '/sms/v1/messages',
          testBody,
        ),
      );
      console.log('SMS send success');
      console.log(response);
      // TODO - define what we do next after a successful send
    } catch (err) {
      console.log('SMS send error');
      console.log(err);
      // TODO - define what we do next after an error
    }
    */

    return Promise.resolve();
  }

  private buildSmsModeBody(dto: SmsDTO): SmsModeBody {
    return {
      recipient: {
        to: dto.to,
      },
      body: {
        text: dto.text,
      },
      from: dto.senderId,
      refClient: dto.internalMessageId,
      callbackUrlStatus: dto.deliveryReportUrl,
      callbackUrlMo: dto.incomingMessageUrl,
    };
  }
}
