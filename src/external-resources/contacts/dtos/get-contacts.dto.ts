import { Type } from 'class-transformer';
import { OasisContactToContactDto } from './oasis-contact-to-contact.dto';
import { BaseExternalResourceResponseDto } from 'src/external-resources/common/dtos/base-external-resource-response.dto';

export class GetContactsDto extends BaseExternalResourceResponseDto<OasisContactToContactDto> {
  @Type(() => OasisContactToContactDto)
  declare value: OasisContactToContactDto[];
}
