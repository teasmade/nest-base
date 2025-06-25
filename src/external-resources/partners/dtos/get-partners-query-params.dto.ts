import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  AccountTypeCodes,
  RentalStructureTypeCodes,
  ServicePointTypeCodes,
} from 'src/oasis/oasis-common/enums/accounts.enum';
import {
  OasisQueryParamTarget,
  OrderBy,
} from 'src/external-resources/common/decorators';
import { QueryParamComponent } from 'src/external-resources/common/types/query-param-component.type';
import { StringToNumberArray } from '@common/decorators/string-to-array.decorator';
import { Type } from 'class-transformer';

export class GetPartnersQueryParamsDTO extends BaseExternalResourceQueryParamsDTO {
  @IsOptional()
  @IsEnum(AccountTypeCodes)
  @Type(() => Number)
  @OasisQueryParamTarget('cap_typecode', 'filter')
  filterAccountType?: QueryParamComponent<AccountTypeCodes>;

  @IsOptional()
  @IsArray()
  @IsEnum(RentalStructureTypeCodes, { each: true })
  @StringToNumberArray()
  @OasisQueryParamTarget('cap_typedepartenairepointgeocode', 'filter')
  filterRentalStructureType?: QueryParamComponent<RentalStructureTypeCodes[]>;

  @IsOptional()
  @IsArray()
  @IsEnum(ServicePointTypeCodes, { each: true })
  @StringToNumberArray()
  @OasisQueryParamTarget('cap_typedepointdegeolocalisationcode', 'filter')
  filterServicePointType?: QueryParamComponent<ServicePointTypeCodes[]>;

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
