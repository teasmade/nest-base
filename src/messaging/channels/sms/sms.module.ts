import { Module } from '@nestjs/common';
import { TwilioProvider } from './providers/twilio/twilio-provider';
import { SmsModeProvider } from './providers/sms-mode/smsmode-provider';
import { smsConstants } from './sms.constants';
import { HttpModule } from '@nestjs/axios';
import { SmsProvider } from './providers/interfaces/sms-provider.interface';

const { provider } = smsConstants;

@Module({
  imports: [
    HttpModule.register({
      // TODO - per provider config pattern - do we need to put a config module in place?
      baseURL: process.env.SMSMODE_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Api-Key': `${process.env.SMSMODE_API_KEY}`,
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'SmsProvider',
      useFactory: (
        smsMode: SmsModeProvider,
        twilio: TwilioProvider,
      ): SmsProvider => {
        switch (provider) {
          case 'smsmode':
            return smsMode;
          case 'twilio':
            return twilio;
          default:
            throw new Error('No SMS provider configured');
        }
      },
      inject: [SmsModeProvider, TwilioProvider],
    },
    TwilioProvider,
    SmsModeProvider,
  ],
  exports: ['SmsProvider'],
})
export class SmsModule {}
