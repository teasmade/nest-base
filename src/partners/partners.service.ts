import { Injectable } from '@nestjs/common';
import { OasisAccountsService } from '../oasis/oasis-accounts/oasis-accounts.service';
import { OasisAccountToPartnerDto } from './dtos/oasis-account-to-partner.dto';
import { OasisAccount } from 'src/oasis/oasis-accounts/interfaces';

@Injectable()
export class PartnersService {
  constructor(private readonly oasisAccountsService: OasisAccountsService) {}

  /**
   * Returns an array of partners mapped from Oasis accounts.
   * @remarks This method should be used with ```@SerializeOptions({type: OasisAccountToPartnerDto})``` decorator on the controller method or with the ```@UseInterceptors(ClassSerializerInterceptor)``` decorator on the controller class to ensure correct class-transformer serialization of the response.
   */
  async getPartners(
    pageSize?: number,
    paginationSessionId?: string,
    direction?: 'next' | 'prev',
  ): Promise<{
    partners: OasisAccountToPartnerDto[];
    pagination?: { paginationSessionId: string; currentPage: number };
  }> {
    const oasisAccounts = await this.oasisAccountsService.getOasisAccounts(
      pageSize,
      paginationSessionId,
      direction,
    );

    const partners = this._mapOasisAccountsToPartners(oasisAccounts.data.value);

    return { partners, pagination: oasisAccounts.pagination };
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
