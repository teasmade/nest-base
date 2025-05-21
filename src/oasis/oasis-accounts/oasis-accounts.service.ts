import { Injectable } from '@nestjs/common';
import { OasisHttpService } from '../oasis-auth/oasis-http.service';
import { OasisResponse } from '../oasis-auth/interfaces/oasis-response.interface';
import { OasisAccount, OasisAccountQueryParams } from './interfaces';

@Injectable()
export class OasisAccountsService {
  constructor(private readonly oasisHttpService: OasisHttpService) {}

  // TODO - work out how to paginate with returned next link cookie
  public async getOasisAccounts(
    pageSize?: number,
  ): Promise<OasisResponse<OasisAccount>> {
    const endpoint = '/accounts';

    const params: OasisAccountQueryParams = {
      $select: [
        'accountid',
        'accountnumber',
        'name',
        'address1_city',
        'address1_stateorprovince',
        'address1_country',
        'address1_line1',
        'address1_line2',
        'address1_line3',
        'address1_postalcode',
        'cap_siret',
        'cap_numtva',
        'cap_typedepartenairecode',
        'cap_typedepointdegeolocalisationcode',
        'cap_typedepartenairepointgeocode',
        '_cap_partenaireparentid_value',
        'createdon',
        'modifiedon',
      ],
      $count: true,
      $orderby: 'name asc',
      $filter: 'cap_typedepartenairepointgeocode ne null',
    };

    const paramsString = this._buildParams(params);
    const response = await this.oasisHttpService.get<OasisAccount>(
      `${endpoint}${paramsString}`,
      pageSize,
    );
    return response.data;
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
