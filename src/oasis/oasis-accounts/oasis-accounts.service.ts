import { Injectable } from '@nestjs/common';
import { OasisHttpService } from '../oasis-common/oasis-http.service';
import { OasisAccount, OasisAccountQueryParams } from './interfaces';
import { PaginatedOasisResponse } from '../oasis-common/interfaces/oasis-pagination.interface';
import { OASIS_ACCOUNT_SELECT_FIELDS } from './oasis-accounts.constants';


@Injectable()
export class OasisAccountsService {
  constructor(private readonly oasisHttpService: OasisHttpService) {}

  // TODO - work out how to paginate with returned next link cookie
  public async getOasisAccounts(
    pageSize?: number,
    paginationSessionId?: string,
    direction?: 'next' | 'prev',
  ): Promise<PaginatedOasisResponse<OasisAccount>> {
    const endpoint = '/accounts';

    const params: OasisAccountQueryParams = {
      $select: OASIS_ACCOUNT_SELECT_FIELDS,
      $count: true,
      $orderby: 'name asc',
      $filter: 'cap_typedepartenairepointgeocode ne null',
    };

    const paramsString = this._buildParams(params);
    const response = await this.oasisHttpService.get<OasisAccount>(
      `${endpoint}${paramsString}`,
      pageSize,
      paginationSessionId,
      direction,
    );
    return { data: response.data, pagination: response.pagination };
  }

  private _buildParams(params: OasisAccountQueryParams): string {
    const paramStrings: string[] = [];

    if (params.$select) {
      paramStrings.push(`$select=${params.$select.join(',')}`);
    }

    if (params.$count !== undefined) {
      paramStrings.push(`$count=${params.$count}`);
    }

    if (params.$filter) {
      paramStrings.push(`$filter=${params.$filter}`);
    }

    if (params.$orderby) {
      paramStrings.push(`$orderby=${params.$orderby}`);
    }

    return paramStrings.length ? '?' + paramStrings.join('&') : '';
  }
}
