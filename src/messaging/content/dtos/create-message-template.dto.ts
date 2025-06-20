import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import {
  MessageChannel,
  TemplateStatus,
} from '../../entities/message-template.entity';

export class CreateMessageTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(MessageChannel)
  channel: MessageChannel;

  @IsEnum(TemplateStatus)
  @IsOptional()
  status?: TemplateStatus = TemplateStatus.ACTIVE;

  @IsNumber()
  @Min(1)
  @Max(999)
  @IsOptional()
  version?: number = 1;

  // Content fields
  @IsString()
  @IsOptional()
  smsContent?: string;

  @IsString()
  @IsOptional()
  emailHtmlContent?: string;

  @IsString()
  @IsOptional()
  emailTextContent?: string;

  @IsString()
  @IsOptional()
  emailSubject?: string;

  @IsString()
  @IsOptional()
  providerTemplateId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  variables?: string[] = [];
}
