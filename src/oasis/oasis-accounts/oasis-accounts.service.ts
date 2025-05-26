import { Injectable } from '@nestjs/common';
import { OasisHttpService } from '../oasis-common/oasis-http.service';
import { OasisAccount } from './interfaces/oasis-account.interface';
import { PaginatedOasisResponse } from '../oasis-common/interfaces/oasis-pagination.interface';
import { OASIS_ACCOUNT_SELECT_FIELDS } from './oasis-accounts.constants';
import {
  accountTypeCodeMap,
  accountCategoryCodeMap,
  AccountTypes,
  AccountsCategories,
} from '../oasis-common/enums/accounts.enum';

// TODO - break interface out to a separate file
interface OasisAccountQueryParams {
  $select?: readonly string[];
  $count?: boolean;
  $filter?: string;
  $orderby?: string;
}

@Injectable()
export class OasisAccountsService {
  constructor(private readonly oasisHttpService: OasisHttpService) {}

  public async getOasisAccounts(
    pageSize?: number,
    paginationSessionId?: string,
    direction?: 'next' | 'prev',
    type?: AccountTypes,
    category?: AccountsCategories,
  ): Promise<PaginatedOasisResponse<OasisAccount>> {
    const endpoint = '/accounts';

    const params: OasisAccountQueryParams = {
      $select: OASIS_ACCOUNT_SELECT_FIELDS,
      $count: true,
      $orderby: 'name asc',
      $filter: this._buildFilterConditions(type, category),
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

  private _buildFilterConditions(
    type?: AccountTypes,
    category?: AccountsCategories,
  ): string {
    const defaultFilters = [
      'cap_typedepointdegeolocalisationcode eq 809020003',
      'cap_typedepointdegeolocalisationcode eq 809020004',
      'cap_typedepointdegeolocalisationcode eq 809020005',
      'cap_typedepointdegeolocalisationcode eq 809020006',
    ];

    const filterGroups: string[] = [];

    // Add type and category filters if provided
    const typeAndCategoryFilters: string[] = [];
    if (type && type in accountTypeCodeMap) {
      typeAndCategoryFilters.push(
        `cap_typedepartenairepointgeocode eq ${accountTypeCodeMap[type]}`,
      );
    }
    if (category && category in accountCategoryCodeMap) {
      typeAndCategoryFilters.push(
        `cap_typedepointdegeolocalisationcode eq ${accountCategoryCodeMap[category]}`,
      );
    }

    // If we have type or category filters, add them as a group
    if (typeAndCategoryFilters.length > 0) {
      filterGroups.push(`(${typeAndCategoryFilters.join(' and ')})`);
    }

    // Always add default filters
    filterGroups.push(`(${defaultFilters.join(' or ')})`);

    // Join all filter groups with AND
    return filterGroups.join(' and ');
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
