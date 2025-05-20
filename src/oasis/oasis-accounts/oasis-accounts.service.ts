import { Injectable } from '@nestjs/common';
import { OasisHttpService } from '../oasis-auth/oasis-http.service';

@Injectable()
export class OasisAccountsService {
  constructor(private readonly oasisHttpService: OasisHttpService) {}

  // TODO - work out how to paginate with returned next link cookie
  public async getOasisAccounts() {
    const endpoint = '/accounts';
    const params = [
      '$select=accountid,accountnumber,name,address1_composite,cap_siret,address1_city,cap_typedepartenairecode,cap_typedepointdegeolocalisationcode,cap_typedepartenairepointgeocode,createdon,modifiedon,cap_numtva,_cap_partenaireparentid_value',
      `$top=20`,
      '$filter=cap_typedepointdegeolocalisationcode eq 809020004',
    ];
    const response = await this.oasisHttpService.get(
      `${endpoint}?${params.join('&')}`,
    );
    return response.data;
  }
}
