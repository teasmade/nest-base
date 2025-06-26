import { Type } from 'class-transformer';
import { OasisAccountToServicePointDto } from './oasis-account-to-service-point.dto';
import { BaseExternalResourceResponseDto } from 'src/external-resources/common/dtos/base-response.dto';

export class GetServicePointsDto extends BaseExternalResourceResponseDto<OasisAccountToServicePointDto> {
  @Type(() => OasisAccountToServicePointDto)
  declare value: OasisAccountToServicePointDto[];
}
