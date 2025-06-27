import { Type } from 'class-transformer';
import { BaseOasisAccountToPartnerDto } from '../common/dtos';
import { BaseExternalResourceResponseDto } from 'src/external-resources/common/dtos/base-response.dto';

export class GetPartnersDto extends BaseExternalResourceResponseDto<BaseOasisAccountToPartnerDto> {
  @Type(() => BaseOasisAccountToPartnerDto)
  declare value: BaseOasisAccountToPartnerDto[];
}
