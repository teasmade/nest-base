import { Type } from 'class-transformer';
import { OasisAccountToPartnerDto } from './oasis-account-to-partner.dto';
import { BaseExternalResourceResponseDto } from 'src/external-resources/common/dtos/base-response.dto';

export class GetPartnerDto extends BaseExternalResourceResponseDto<OasisAccountToPartnerDto> {
  @Type(() => OasisAccountToPartnerDto)
  declare value: OasisAccountToPartnerDto;
}
