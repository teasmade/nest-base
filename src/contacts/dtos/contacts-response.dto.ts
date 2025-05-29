import { Type } from 'class-transformer';
import { OasisContactToContactDto } from './oasis-contact-to-contact.dto';
import { BaseFeatureResponseDto } from '@common/dtos/base-feature-response.dto';

export class GetContactsResponseDto extends BaseFeatureResponseDto<OasisContactToContactDto> {
  @Type(() => OasisContactToContactDto)
  declare value: OasisContactToContactDto[];
}
