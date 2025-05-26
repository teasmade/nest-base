import { Injectable } from '@nestjs/common';
import { OasisAccountsService } from '../oasis/oasis-accounts/oasis-accounts.service';
import { GetPartnersResponseDto } from './dtos/partners-response-dto';
import {
  AccountsCategories,
  AccountTypes,
} from 'src/oasis/oasis-common/enums/accounts.enum';

@Injectable()
export class PartnersService {
  constructor(private readonly oasisAccountsService: OasisAccountsService) {}

  /**
   * Returns an array of partners mapped from Oasis accounts.
   * @remarks This method should be used with ```@UseInterceptors(ClassSerializerInterceptor)``` decorator on the controller class to ensure correct class-transformer serialization of the response.
   */
  async getPartners(
    pageSize?: number,
    paginationSessionId?: string,
    direction?: 'next' | 'prev',
    type?: AccountTypes,
    category?: AccountsCategories,
  ): Promise<GetPartnersResponseDto> {
    const oasisAccounts = await this.oasisAccountsService.getOasisAccounts(
      pageSize,
      paginationSessionId,
      direction,
      type,
      category,
    );

    // Note - we need to return an instance of the DTO class, not a plain old JS object, otherwise class-transformer serialization won't work properly.
    const dto = new GetPartnersResponseDto();
    dto.value = oasisAccounts.data.value;
    dto.pagination = oasisAccounts.pagination;
    return dto;
  }
}
