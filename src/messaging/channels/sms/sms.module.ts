import { Module } from '@nestjs/common';
import { TwilioProvider } from './providers/twilio/twilio-provider';
import { SmsModeProvider } from './providers/sms-mode/smsmode-provider';
import { smsConstants } from './sms.constants';
import { HttpModule } from '@nestjs/axios';
import { SmsProvider } from './providers/interfaces/sms-provider.interface';

// This pattern is based on choosing one provider config at a time
// E.g. a basic provider for dev and a more robust provider for prod
const { provider } = smsConstants as { provider: 'smsmode' | 'twilio' };

const httpConfigMap = {
  smsmode: {
    baseURL: process.env.SMSMODE_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Api-Key': `${process.env.SMSMODE_API_KEY}`,
    },
  },
  twilio: {
    baseURL: process.env.TWILIO_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
};

const providerInstanceMap = {
  smsmode: SmsModeProvider,
  twilio: TwilioProvider,
};

@Module({
  imports: [HttpModule.register(httpConfigMap[provider])],
  controllers: [],
  providers: [
    {
      provide: 'SmsProvider',
      useFactory: (provider: SmsModeProvider | TwilioProvider): SmsProvider => {
        return provider;
      },
      inject: [providerInstanceMap[provider]],
    },
    TwilioProvider,
    SmsModeProvider,
  ],
  exports: ['SmsProvider'],
})
export class SmsModule {}
