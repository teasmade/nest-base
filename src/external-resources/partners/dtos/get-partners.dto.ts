import { Type } from 'class-transformer';
import { OasisAccountToPartnerDto } from './oasis-account-to-partner.dto';
import { BaseExternalResourceResponseDto } from 'src/external-resources/common/dtos/base-external-resource-response.dto';

export class GetPartnersDto extends BaseExternalResourceResponseDto<OasisAccountToPartnerDto> {
  @Type(() => OasisAccountToPartnerDto)
  declare value: OasisAccountToPartnerDto[];
}
