import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  AccountTypeCodes,
  AccountCategoryCodes,
  accountCategoryCodeMap,
  accountTypeCodeMap,
} from 'src/oasis/oasis-common/enums/accounts.enum';
import {
  OasisQueryParamTarget,
  OrderBy,
} from 'src/external-resources/common/decorators';
import { QueryParamComponents } from 'src/external-resources/common/types/query-param-components.type';

export class GetPartnersQueryParamsDTO extends BaseExternalResourceQueryParamsDTO {
  @IsOptional()
  @IsEnum(Object.values(accountTypeCodeMap), {
    message: () =>
      'filterType must be one of the following: ' +
      Object.values(accountTypeCodeMap).join(', '),
  })
  @OasisQueryParamTarget('cap_typedepointdegeolocalisationcode', 'filter')
  filterType?: QueryParamComponents<AccountTypeCodes>;

  @IsOptional()
  @IsEnum(Object.values(accountCategoryCodeMap), {
    message: 'Bad category',
  })
  @OasisQueryParamTarget('cap_typedepartenairepointgeocode', 'filter')
  filterCategory?: QueryParamComponents<AccountCategoryCodes>;

  @IsOptional()
  @IsString()
  @OasisQueryParamTarget('name', 'search')
  searchName?: QueryParamComponents<string>;

  @IsOptional()
  @OrderBy()
  @OasisQueryParamTarget('name', 'orderby')
  orderbyName?: QueryParamComponents<string>;

  @IsOptional()
  @IsString()
  @OasisQueryParamTarget('address1_city', 'search')
  searchCity?: QueryParamComponents<string>;

  @IsOptional()
  @OrderBy()
  @OasisQueryParamTarget('address1_city', 'orderby')
  orderbyCity?: QueryParamComponents<string>;

  @IsOptional()
  @IsString()
  @OasisQueryParamTarget('address1_postalcode', 'search')
  searchPostalcode?: QueryParamComponents<string>;

  @IsOptional()
  @OrderBy()
  @OasisQueryParamTarget('address1_postalcode', 'orderby')
  orderbyPostalcode?: QueryParamComponents<string>;
}
