import { Injectable } from '@nestjs/common';
import { OasisAccountsService } from '../oasis/oasis-accounts/oasis-accounts.service';
import { GetPartnersResponseDto } from './dtos/partners-response-dto';
import { PartnerQueryParamsDTO } from './dtos/partner-query-params.dto';

@Injectable()
export class PartnersService {
  constructor(private readonly oasisAccountsService: OasisAccountsService) {}

  /**
   * Returns an array of partners mapped from Oasis accounts.
   * @remarks This method should be used with ```@UseInterceptors(ClassSerializerInterceptor)``` decorator on the controller class to ensure correct class-transformer serialization of the response.
   */
  async getPartners(
    getPartnersQueryParams?: PartnerQueryParamsDTO,
  ): Promise<GetPartnersResponseDto> {
    const oasisAccounts = await this.oasisAccountsService.getOasisAccounts(
      getPartnersQueryParams,
    );

    // Note - we need to return an instance of the DTO class, not a plain old JS object, otherwise class-transformer serialization won't work properly.
    const dto = new GetPartnersResponseDto();
    dto.value = oasisAccounts.data.value;
    dto.pagination = oasisAccounts.pagination;
    return dto;
  }
}
