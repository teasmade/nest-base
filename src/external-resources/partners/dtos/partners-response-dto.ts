import { Type } from 'class-transformer';
import { OasisAccountToPartnerDto } from './oasis-account-to-partner.dto';
import { BaseFeatureResponseDto } from '@common/dtos/base-feature-response.dto';

export class GetPartnersResponseDto extends BaseFeatureResponseDto<OasisAccountToPartnerDto> {
  @Type(() => OasisAccountToPartnerDto)
  declare value: OasisAccountToPartnerDto[];
}
