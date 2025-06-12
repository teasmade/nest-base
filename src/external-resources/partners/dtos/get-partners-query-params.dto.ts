import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  AccountTypeCodes,
  AccountCategoryCodes,
} from 'src/oasis/oasis-common/enums/accounts.enum';
import {
  OasisQueryParamTarget,
  OrderBy,
} from 'src/external-resources/common/decorators';
import { QueryParamComponent } from 'src/external-resources/common/types/query-param-component.type';
import { Type } from 'class-transformer';

export class GetPartnersQueryParamsDTO extends BaseExternalResourceQueryParamsDTO {
  @IsOptional()
  @Type(() => Number)
  @IsEnum(AccountTypeCodes)
  @OasisQueryParamTarget('cap_typedepartenairepointgeocode', 'filter')
  filterType?: QueryParamComponent<AccountTypeCodes>;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(AccountCategoryCodes)
  @OasisQueryParamTarget('cap_typedepointdegeolocalisationcode', 'filter')
  filterCategory?: QueryParamComponent<AccountCategoryCodes>;

  @IsOptional()
  @IsString()
  @OasisQueryParamTarget('name', 'search')
  searchName?: QueryParamComponent<string>;

  @IsOptional()
  @OrderBy()
  @OasisQueryParamTarget('name', 'orderby')
  orderbyName?: QueryParamComponent<string>;

  @IsOptional()
  @IsString()
  @OasisQueryParamTarget('address1_city', 'search')
  searchCity?: QueryParamComponent<string>;

  @IsOptional()
  @OrderBy()
  @OasisQueryParamTarget('address1_city', 'orderby')
  orderbyCity?: QueryParamComponent<string>;

  @IsOptional()
  @IsString()
  @OasisQueryParamTarget('address1_postalcode', 'search')
  searchPostalcode?: QueryParamComponent<string>;

  @IsOptional()
  @OrderBy()
  @OasisQueryParamTarget('address1_postalcode', 'orderby')
  orderbyPostalcode?: QueryParamComponent<string>;
}
