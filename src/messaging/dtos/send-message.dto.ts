import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class SendMessageDto {
  @IsUUID()
  @IsNotEmpty()
  templateId: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @IsObject()
  @IsOptional()
  data: Record<string, any> = {};
}
