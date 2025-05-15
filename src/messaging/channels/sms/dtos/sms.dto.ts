import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class SmsDTO {
  /**
   * The phone number of the recipient.
   * @validation E164 format, FR region, e.g. 33600000000
   */
  @IsString()
  @IsNotEmpty()
  // TODO - check precise send policy, French numbers only etc?
  // IsPhoneNumber uses https://www.npmjs.com/package/libphonenumber-js which seems pretty well used
  @IsPhoneNumber('FR', {
    message: 'Phone number must be FR and in E.164 format (e.g., 33600000000)',
  })
  to: string;

  /**
   * The body text of the message.
   * @validation min 1, max 670
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(670)
  text: string;

  /**
   * smsmode: Used to configure a specific sender.
   * @validation min 1, max 11
   * @supportedProviders smsmode
   */
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(11)
  senderId?: string;

  /**
   * smsmode: Used to attach an arbitrary reference to the message.
   * @validation min 3, max 140
   * @supportedProviders smsmode
   */
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(140)
  internalMessageId?: string;

  /**
   * smsmode: Defines the endpoint called on delivery report.
   * @validation max 255
   * @supportedProviders smsmode
   */
  @IsString()
  @IsOptional()
  @MaxLength(255)
  deliveryReportUrl?: string;

  /**
   * smsmode: Defines the endpoint called on incoming message.
   * @validation max 255
   * @supportedProviders smsmode
   */
  @IsString()
  @IsOptional()
  @MaxLength(255)
  incomingMessageUrl?: string;
}
