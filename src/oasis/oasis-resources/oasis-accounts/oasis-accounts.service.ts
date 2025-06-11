import { Injectable } from '@nestjs/common';
import { OasisHttpService } from '@oasis/oasis-common/oasis-http.service';
import { PaginatedOasisResponse } from '@oasis/oasis-common/interfaces/oasis-pagination.interface';
import { OASIS_ACCOUNT_SELECT_FIELDS } from './oasis-accounts.constants';
import { GetPartnersQueryParamsDTO } from 'src/external-resources/partners/dtos/get-partners-query-params.dto';
import {
  OasisCreateAccountBody,
  OasisUpdateAccountBody,
  OasisAccount,
} from './interfaces';
import { OasisResourceService } from '@oasis/oasis-common/base-services/oasis-resource.service';

@Injectable()
export class OasisAccountsService extends OasisResourceService {
  constructor(private readonly oasisHttpService: OasisHttpService) {
    super();
  }

  public async get(
    getAccountsQueryParams?: GetPartnersQueryParamsDTO,
  ): Promise<PaginatedOasisResponse<OasisAccount>> {
    const { pageSize, paginationSessionId, direction, paramsString } =
      this.handleQueryParams(
        getAccountsQueryParams ?? {},
        OASIS_ACCOUNT_SELECT_FIELDS,
      );

    const endpoint = '/accounts';

    const response = await this.oasisHttpService.get<OasisAccount>(
      `${endpoint}${paramsString}`,
      pageSize,
      paginationSessionId,
      direction,
    );
    return response;
  }

  public async getOne(
    id: string,
  ): Promise<PaginatedOasisResponse<OasisAccount>> {
    const endpoint = `/accounts(${id})`;

    const paramsString = `?$select=${OASIS_ACCOUNT_SELECT_FIELDS.join(',')}`;

    const response = await this.oasisHttpService.get<OasisAccount>(
      `${endpoint}${paramsString}`,
    );

    return response;
  }

  public async create(account: OasisCreateAccountBody): Promise<string> {
    const endpoint = '/accounts';
    const accountToCreate = {
      ...account,
      // always 809020000 for partners, TODO organise this in a constant
      cap_typecode: 809020000,
    };
    const response = await this.oasisHttpService.post<OasisCreateAccountBody>(
      endpoint,
      accountToCreate,
    );

    const id = this.extractGuidFromODataUrl(response);
    return id;
  }

  public async update(
    id: string,
    account: OasisUpdateAccountBody,
  ): Promise<string> {
    const endpoint = `/accounts(${id})`;
    const response = await this.oasisHttpService.patch<OasisUpdateAccountBody>(
      endpoint,
      account,
    );

    const returnId = this.extractGuidFromODataUrl(response);
    return returnId;
  }
}
