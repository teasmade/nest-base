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
  AccountSearchQuery,
} from '../oasis-common/enums/accounts.enum';
import { PartnerQueryParamsDTO } from 'src/partners/dtos/partner-query-params.dto';

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
    getPartnersQueryParams?: PartnerQueryParamsDTO,
  ): Promise<PaginatedOasisResponse<OasisAccount>> {
    const { pageSize, paginationSessionId, direction, type, category, search } =
      getPartnersQueryParams ?? {};

    const endpoint = '/accounts';

    const params: OasisAccountQueryParams = {
      $select: OASIS_ACCOUNT_SELECT_FIELDS,
      $count: true,
      $orderby: 'name asc',
      $filter: this._buildFilterConditions(type, category, search),
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

  //  TODO - we need to break out mappings from domain keys back to oasis
  private _buildFilterConditions(
    type?: AccountTypes,
    category?: AccountsCategories,
    search?: AccountSearchQuery,
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
    let filterString = filterGroups.join(' and ');

    // Oasis search is in the format contains(name, 'search')
    // TODO - break out mappings from domain keys back to oasis
    // TODO - validate search query param value
    if (search) {
      const searchFieldMap = {
        name: 'name',
        city: 'address1_city',
        postalcode: 'address1_postalcode',
      };
      const [field, value] = search.split(':');
      filterString += ` and contains(${searchFieldMap[field as keyof typeof searchFieldMap]}, '${value}')`;
    }
    return filterString;
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
