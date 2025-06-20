import { Expose, Type } from 'class-transformer';
import {
  // MessageTemplate,
  MessageChannel,
  TemplateStatus,
} from '../../entities/message-template.entity';
// import { User } from '../../../users/entities/user.entity';

// type MessageTemplateResponseShape = {
//   id: MessageTemplate['id'];
//   name: MessageTemplate['name'];
//   description: MessageTemplate['description'];
//   category: MessageTemplate['category'];
//   tags: MessageTemplate['tags'];
//   channel: MessageChannel;
//   status: TemplateStatus;
//   version: MessageTemplate['version'];
//   smsContent: MessageTemplate['smsContent'];
//   emailHtmlContent: MessageTemplate['emailHtmlContent'];
//   emailTextContent: MessageTemplate['emailTextContent'];
//   emailSubject: MessageTemplate['emailSubject'];
//   providerTemplateId: MessageTemplate['providerTemplateId'];
//   variables: MessageTemplate['variables'];
//   createdAt: MessageTemplate['createdAt'];
//   updatedAt: MessageTemplate['updatedAt'];
//   createdBy: { email: User['email'] };
//   updatedBy: { email: User['email'] };
// };

class UserResponseDto {
  @Expose()
  email: string;
}

export class MessageTemplateResponseDto {
  // implements MessageTemplateResponseShape
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  category: string;

  @Expose()
  tags: string[];

  @Expose()
  channel: MessageChannel;

  @Expose()
  status: TemplateStatus;

  @Expose()
  version: number;

  @Expose()
  smsContent: string;

  @Expose()
  emailHtmlContent: string;

  @Expose()
  emailTextContent: string;

  @Expose()
  emailSubject: string;

  @Expose()
  providerTemplateId: string;

  @Expose()
  variables: string[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponseDto)
  createdBy: UserResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  updatedBy: UserResponseDto;
}
