import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';
import { IsNotEmpty, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { OasisQueryParamTarget } from 'src/external-resources/common/decorators';
import { QueryParamComponent } from 'src/external-resources/common/types/query-param-component.type';
import {
  AccountCategoryCodes,
  AccountTypeCodes,
} from '@oasis/oasis-common/enums/accounts.enum';
import { Type } from 'class-transformer';

export class GetPartnerProximityQueryParamsDTO extends BaseExternalResourceQueryParamsDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsEnum(AccountCategoryCodes)
  partnerCategory: QueryParamComponent<string>;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(AccountTypeCodes)
  @OasisQueryParamTarget('cap_typedepartenairepointgeocode', 'filter')
  partnerType?: QueryParamComponent<string>;

  @IsOptional()
  @IsBoolean()
  missionCentered?: boolean = false;
}
