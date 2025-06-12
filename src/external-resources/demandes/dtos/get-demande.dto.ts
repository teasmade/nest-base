import { Type } from 'class-transformer';
import { OasisIncidentToDemandeDto } from './oasis-incident-to-demande.dto';
import { BaseExternalResourceResponseDto } from 'src/external-resources/common/dtos/base-response.dto';

export class GetDemandeDto extends BaseExternalResourceResponseDto<OasisIncidentToDemandeDto> {
  @Type(() => OasisIncidentToDemandeDto)
  declare value: OasisIncidentToDemandeDto;
}
