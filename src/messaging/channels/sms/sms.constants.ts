// import * as dotenv from 'dotenv';

// dotenv.config();

const { SMS_PROVIDER } = process.env;

if (!SMS_PROVIDER) {
  throw new Error('SMS_PROVIDER env variable must be set');
}

export const smsConstants = {
  provider: SMS_PROVIDER as 'smsmode' | 'twilio',
};
