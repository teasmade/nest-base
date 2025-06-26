import { Injectable } from '@nestjs/common';
import { OasisAccountsService } from '@oasis/oasis-resources/oasis-accounts/oasis-accounts.service';
import {
  OasisCreateAccountBody,
  OasisUpdateAccountBody,
} from '@oasis/oasis-resources/oasis-accounts/interfaces';
import { ExternalResourceService } from '../../common/base-services/external-resource.service';
import {
  GetServicePointsDto,
  GetServicePointQueryParamsDTO,
  GetServicePointDto,
  CreateServicePointDto,
  UpdateServicePointDto,
} from './dtos';
import { GetPartnersQueryParamsDTO } from '../dtos/get-partners-query-params.dto';
import { plainToInstance } from 'class-transformer';
import {
  AccountTypeCodes,
  validServicePointTypeCodes,
} from '@oasis/oasis-common/enums/accounts.enum';
import { QueryParamComponent } from 'src/external-resources/common/types/query-param-component.type';

@Injectable()
export class ServicePointsService extends ExternalResourceService {
  constructor(private readonly oasisAccountsService: OasisAccountsService) {
    super();
  }

  async getServicePoints(
    getServicePointQueryParams?: GetServicePointQueryParamsDTO,
  ): Promise<GetServicePointsDto> {
    // Apply service point specific defaults
    const paramsWithDefaults = {
      ...getServicePointQueryParams,
      // Default service point types for partners features if not specified
      filterServicePointType:
        getServicePointQueryParams?.filterServicePointType ??
        validServicePointTypeCodes,
    };

    const transformedQueryParams = plainToInstance(
      GetServicePointQueryParamsDTO,
      paramsWithDefaults,
      { groups: ['transform'] },
    ) as unknown as GetPartnersQueryParamsDTO;

    const accountTypeConstraint: QueryParamComponent<AccountTypeCodes> = {
      target: 'cap_typecode',
      value: AccountTypeCodes.ServicePoint,
      type: 'filter',
    };

    const oasisQueryParams = {
      ...transformedQueryParams,
      ...{
        filterAccountType: accountTypeConstraint,
      },
    };

    const oasisAccounts = await this.oasisAccountsService.get(oasisQueryParams);

    return this.assignOasisResponseToTransformationDTO(
      oasisAccounts,
      GetServicePointsDto,
    );
  }

  async getServicePoint(id: string): Promise<GetServicePointDto> {
    const oasisAccount = await this.oasisAccountsService.getOne(id);

    return this.assignOasisResponseToTransformationDTO(
      oasisAccount,
      GetServicePointDto,
    );
  }

  async createServicePoint(
    createServicePointDto: CreateServicePointDto,
  ): Promise<string> {
    const oasisCreateAccountBody = this.transformInputDTOToOasisBody<
      OasisCreateAccountBody,
      CreateServicePointDto
    >(createServicePointDto);

    return await this.oasisAccountsService.create(oasisCreateAccountBody);
  }

  async updateServicePoint(
    id: string,
    updateServicePointDto: UpdateServicePointDto,
  ): Promise<string> {
    const oasisUpdateAccountBody = this.transformInputDTOToOasisBody<
      OasisUpdateAccountBody,
      UpdateServicePointDto
    >(updateServicePointDto);

    return await this.oasisAccountsService.update(id, oasisUpdateAccountBody);
  }
}
