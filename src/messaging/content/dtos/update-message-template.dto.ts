import {
  IsString,
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

export class UpdateMessageTemplateDto {
  @IsString()
  @IsOptional()
  name?: string;

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
  @IsOptional()
  channel?: MessageChannel;

  @IsEnum(TemplateStatus)
  @IsOptional()
  status?: TemplateStatus;

  @IsNumber()
  @Min(1)
  @Max(999)
  @IsOptional()
  version?: number;

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
  variables?: string[];
}
