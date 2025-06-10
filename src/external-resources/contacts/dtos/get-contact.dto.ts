import { Type } from 'class-transformer';
import { OasisContactToContactDto } from './oasis-contact-to-contact.dto';
import { BaseExternalResourceResponseDto } from 'src/external-resources/common/dtos/base-response.dto';

export class GetContactDto extends BaseExternalResourceResponseDto<OasisContactToContactDto> {
  @Type(() => OasisContactToContactDto)
  declare value: OasisContactToContactDto;
}
