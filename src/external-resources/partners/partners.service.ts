import { Injectable } from '@nestjs/common';
import { OasisAccountsService } from '@oasis/oasis-resources/oasis-accounts/oasis-accounts.service';
import {
  OasisCreateAccountBody,
  OasisUpdateAccountBody,
} from '@oasis/oasis-resources/oasis-accounts/interfaces';
import { ExternalResourceService } from '../common/base-services/external-resource.service';
import {
  GetPartnersDto,
  GetPartnersQueryParamsDTO,
  GetPartnerDto,
  CreatePartnerDto,
  UpdatePartnerDto,
} from './dtos';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PartnersService extends ExternalResourceService {
  constructor(private readonly oasisAccountsService: OasisAccountsService) {
    super();
  }

  async getPartners(
    getPartnersQueryParams?: GetPartnersQueryParamsDTO,
  ): Promise<GetPartnersDto> {
    const transformedQueryParams = plainToInstance(
      GetPartnersQueryParamsDTO,
      getPartnersQueryParams,
      { groups: ['transform'] },
    );

    const oasisAccounts = await this.oasisAccountsService.get(
      transformedQueryParams,
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

  async updatePartner(
    id: string,
    updatePartnerDto: UpdatePartnerDto,
  ): Promise<string> {
    const oasisUpdateAccountBody = this.transformInputDTOToOasisBody<
      OasisUpdateAccountBody,
      UpdatePartnerDto
    >(updatePartnerDto);

    return await this.oasisAccountsService.update(id, oasisUpdateAccountBody);
  }
}
