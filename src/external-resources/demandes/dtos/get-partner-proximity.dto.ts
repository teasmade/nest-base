import { Type } from 'class-transformer';
import { OasisAccountToPartnerWithDistanceDto } from './';
import { BaseExternalResourceResponseDto } from 'src/external-resources/common/dtos/base-response.dto';

export class GetPartnerProximityDto extends BaseExternalResourceResponseDto<OasisAccountToPartnerWithDistanceDto> {
  @Type(() => OasisAccountToPartnerWithDistanceDto)
  declare value: OasisAccountToPartnerWithDistanceDto;
}
