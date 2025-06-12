import { Injectable } from '@nestjs/common';
import { OasisIncidentsService } from 'src/oasis/oasis-resources/oasis-incidents/oasis-incidents.service';
import { GetDemandesDto, GetDemandesQueryParamsDTO } from './dtos';
import { plainToInstance } from 'class-transformer';
import { ExternalResourceService } from '../common/base-services/external-resource.service';

@Injectable()
export class DemandesService extends ExternalResourceService {
  constructor(private readonly oasisIncidentsService: OasisIncidentsService) {
    super();
  }

  public async getDemandes(
    getDemandesQueryParams?: GetDemandesQueryParamsDTO,
  ): Promise<GetDemandesDto> {
    const transformedQueryParams = plainToInstance(
      GetDemandesQueryParamsDTO,
      getDemandesQueryParams,
      { groups: ['transform'] },
    );

    const oasisIncidents = await this.oasisIncidentsService.get(
      transformedQueryParams,
    );

    return this.assignOasisResponseToTransformationDTO(
      oasisIncidents,
      GetDemandesDto,
    );
  }
}
