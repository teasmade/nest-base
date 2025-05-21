import { Injectable } from '@nestjs/common';
import { OasisAccountsService } from '../oasis/oasis-accounts/oasis-accounts.service';
import { OasisAccountToPartnerDto } from './dtos/oasis-account-to-partner.dto';
import { OasisAccount } from 'src/oasis/oasis-accounts/interfaces';

@Injectable()
export class PartnersService {
  constructor(private readonly oasisAccountsService: OasisAccountsService) {}

  /**
   * Returns an array of partners mapped from Oasis accounts.
   * @remarks This method should be used with ```@SerializeOptions({type: OasisAccountToPartnerDto})``` decorator on the controller method
   * to ensure correct class-transformer serialization of the response.
   */
  async getPartners(pageSize?: number): Promise<OasisAccountToPartnerDto[]> {
    const oasisAccounts =
      await this.oasisAccountsService.getOasisAccounts(pageSize);
    return this._mapOasisAccountsToPartners(oasisAccounts.value);
  }

  // We need to map in this way so that we return instances of the DTO class, not plain old JS objects, otherwise class-transformer serialization won't work properly.
  private _mapOasisAccountsToPartners(
    oasisAccounts: OasisAccount[],
  ): OasisAccountToPartnerDto[] {
    return oasisAccounts.map((account) =>
      Object.assign(new OasisAccountToPartnerDto(), account),
    );
  }
}
