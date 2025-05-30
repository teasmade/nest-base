import { Injectable } from '@nestjs/common';
import { OasisAccountsService } from '@oasis/oasis-resources/oasis-accounts/oasis-accounts.service';
import { GetPartnersDto } from './dtos/get-partners.dto';
import { GetPartnersQueryParamsDTO } from './dtos/get-partners-query-params.dto';
import { CreatePartnerDto } from './dtos/create-partner.dto';
import { OasisCreateAccountBody } from '@oasis/oasis-resources/oasis-accounts/interfaces/oasis-create-account.interface';
import { ExternalResourceService } from '../common/external-resource.service';
import { GetPartnerDto } from './dtos/get-partner.dto';

@Injectable()
export class PartnersService extends ExternalResourceService {
  constructor(private readonly oasisAccountsService: OasisAccountsService) {
    super();
  }

  async getPartners(
    getPartnersQueryParams?: GetPartnersQueryParamsDTO,
  ): Promise<GetPartnersDto> {
    const oasisAccounts = await this.oasisAccountsService.get(
      getPartnersQueryParams,
    );

    return this.assignOasisResponseToTransformationDTO(
      oasisAccounts,
      GetPartnersDto,
    );
  }

  async getPartner(id: string): Promise<GetPartnerDto> {
    const oasisAccount = await this.oasisAccountsService.getOne(id);

    return this.assignOasisResponseToTransformationDTO(
      oasisAccount,
      GetPartnerDto,
    );
  }

  async createPartner(createPartnerDto: CreatePartnerDto): Promise<string> {
    const oasisCreateAccountBody = this.transformInputDTOToOasisBody<
      OasisCreateAccountBody,
      CreatePartnerDto
    >(createPartnerDto);

    return await this.oasisAccountsService.create(oasisCreateAccountBody);
  }
}
