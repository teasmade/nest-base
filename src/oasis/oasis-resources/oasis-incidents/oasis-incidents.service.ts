import { Injectable } from '@nestjs/common';
import { OasisHttpService } from '@oasis/oasis-common/oasis-http.service';
import { PaginatedOasisResponse } from '@oasis/oasis-common/interfaces/oasis-pagination.interface';
import { OASIS_INCIDENT_SELECT_FIELDS } from './oasis-incidents.constants';
import { OasisResourceService } from '@oasis/oasis-common/base-services/oasis-resource.service';
import { OasisIncident } from './interfaces/oasis-incident.interface';
import { GetDemandesQueryParamsDTO } from 'src/external-resources/demandes/dtos/get-demandes-query-params.dto';

@Injectable()
export class OasisIncidentsService extends OasisResourceService {
  constructor(private readonly oasisHttpService: OasisHttpService) {
    super();
  }

  public async get(
    getIncidentsQueryParams?: GetDemandesQueryParamsDTO,
  ): Promise<PaginatedOasisResponse<OasisIncident>> {
    const { pageSize, paginationSessionId, direction, paramsString } =
      this.handleQueryParams(
        getIncidentsQueryParams ?? {},
        OASIS_INCIDENT_SELECT_FIELDS,
      );

    const endpoint = '/incidents';

    const response = await this.oasisHttpService.get<OasisIncident>(
      `${endpoint}${paramsString}`,
      pageSize,
      paginationSessionId,
      direction,
    );
    return response;
  }
}
