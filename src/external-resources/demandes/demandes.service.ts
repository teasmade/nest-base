import { Injectable } from '@nestjs/common';
import { OasisIncidentsService } from 'src/oasis/oasis-resources/oasis-incidents/oasis-incidents.service';
import {
  GetDemandeDto,
  GetDemandesDto,
  GetDemandesQueryParamsDTO,
  GetPartnerProximityQueryParamsDTO,
  GetPartnerProximityDto,
} from './dtos';
import { plainToInstance } from 'class-transformer';
import { ExternalResourceService } from '../common/base-services/external-resource.service';

@Injectable()
export class DemandesService extends ExternalResourceService {
  constructor(private readonly oasisIncidentsService: OasisIncidentsService) {
    super();
  }

  async getDemandes(
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

  async getDemande(id: string): Promise<GetDemandeDto> {
    const oasisIncident = await this.oasisIncidentsService.getOne(id);

    return this.assignOasisResponseToTransformationDTO(
      oasisIncident,
      GetDemandeDto,
    );
  }

  async getDemandePartnerProximity(
    demandeId: string,
    getPartnerProximityQueryParams?: GetPartnerProximityQueryParamsDTO,
  ): Promise<GetPartnerProximityDto> {
    const transformedQueryParams = plainToInstance(
      GetPartnerProximityQueryParamsDTO,
      getPartnerProximityQueryParams,
      { groups: ['transform'] },
    );

    const oasisPartners = await this.oasisIncidentsService.getPartnerProximity(
      demandeId,
      transformedQueryParams,
    );

    return this.assignOasisResponseToTransformationDTO(
      oasisPartners,
      GetPartnerProximityDto,
    );
  }
}
