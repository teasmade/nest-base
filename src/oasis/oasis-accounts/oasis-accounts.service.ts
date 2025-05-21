import { Injectable } from '@nestjs/common';
import { OasisHttpService } from '../oasis-auth/oasis-http.service';

interface OasisAccountQueryParams {
  $select?: string[];
  $count?: boolean;
  $filter?: string;
  $orderby?: string;
}

@Injectable()
export class OasisAccountsService {
  constructor(private readonly oasisHttpService: OasisHttpService) {}

  // TODO - work out how to paginate with returned next link cookie
  public async getOasisAccounts(pageSize?: number) {
    const endpoint = '/accounts';

    // accountid,accountnumber,name,address1_composite,cap_siret,address1_city,cap_typedepartenairecode,cap_typedepointdegeolocalisationcode,cap_typedepartenairepointgeocode,createdon,modifiedon,cap_numtva,_cap_partenaireparentid_value
    const params: OasisAccountQueryParams = {
      $select: [
        'accountid',
        'accountnumber',
        'name',
        'address1_composite',
        'cap_siret',
        'address1_city',
        'cap_typedepartenairecode',
        'cap_typedepointdegeolocalisationcode',
        'cap_typedepartenairepointgeocode',
        'createdon',
        'modifiedon',
        'cap_numtva',
        '_cap_partenaireparentid_value',
      ],
      $count: true,
      $orderby: 'name asc',
    };

    const paramsString = this.buildParams(params);
    const response = await this.oasisHttpService.get(
      `${endpoint}${paramsString}`,
      pageSize,
    );
    return response.data;
  }

  private buildParams(params: OasisAccountQueryParams): string {
    // ?$select=accountid,accountnumber,name,address1_composite,cap_siret,address1_city,cap_typedepartenairecode,cap_typedepointdegeolocalisationcode,cap_typedepartenairepointgeocode,createdon,modifiedon,cap_numtva,_cap_partenaireparentid_value&$count=true&$orderby=name
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
