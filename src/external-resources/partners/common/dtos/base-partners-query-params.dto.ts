import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';
import { IsArray, IsEnum, IsString } from 'class-validator';
import {
  AccountTypeCodes,
  RentalStructureTypeCodes,
  ServicePointTypeCodes,
  VehicleTypeCodes,
} from 'src/oasis/oasis-common/enums/accounts.enum';
import {
  OasisQueryParamTarget,
  OrderBy,
} from 'src/external-resources/common/decorators';
import { QueryParamComponent } from 'src/external-resources/common/types/query-param-component.type';
import { StringToNumberArray } from '@common/decorators/string-to-array.decorator';
import { Type } from 'class-transformer';

/**
 * This is the base class for partner module query params. All query params that will be used for multiple features should be defined here.
 * It's responsible for input value validation and mapping to Oasis query param property names.
 * Query param DTOs for features should extend this class using the PickType utility from @nestjs/mapped-types to select the properties they need.
 * DTOs extending this class are responsible for defining validation rules for the presence of the properties they pick using @IsNotEmpty() / @IsOptional()
 */

export class BasePartnersQueryParamsDTO extends BaseExternalResourceQueryParamsDTO {
  @Type(() => Number)
  @IsEnum(AccountTypeCodes)
  @OasisQueryParamTarget('cap_typecode', 'filter')
  filterAccountType: QueryParamComponent<AccountTypeCodes>;

  @Type(() => Number)
  @IsEnum(RentalStructureTypeCodes)
  @OasisQueryParamTarget('cap_typedepartenairepointgeocode', 'filter')
  filterRentalStructureType: QueryParamComponent<RentalStructureTypeCodes>;

  @IsArray()
  @StringToNumberArray()
  @IsEnum(RentalStructureTypeCodes, { each: true })
  @OasisQueryParamTarget('cap_typedepartenairepointgeocode', 'filter')
  filterRentalStructureTypeMulti: QueryParamComponent<
    RentalStructureTypeCodes[]
  >;

  @Type(() => Number)
  @IsEnum(ServicePointTypeCodes)
  @OasisQueryParamTarget('cap_typedepointdegeolocalisationcode', 'filter')
  filterServicePointType: QueryParamComponent<ServicePointTypeCodes>;

  @IsArray()
  @StringToNumberArray()
  @IsEnum(ServicePointTypeCodes, { each: true })
  @OasisQueryParamTarget('cap_typedepointdegeolocalisationcode', 'filter')
  filterServicePointTypeMulti: QueryParamComponent<ServicePointTypeCodes[]>;

  @Type(() => Number)
  @IsEnum(VehicleTypeCodes)
  @OasisQueryParamTarget('cap_typevehiculecode', 'filter')
  partnerFilterVehicleType: QueryParamComponent<VehicleTypeCodes>;

  @IsArray()
  @StringToNumberArray()
  @IsEnum(VehicleTypeCodes, { each: true })
  @OasisQueryParamTarget('cap_typevehiculecode', 'filter')
  partnerFilterVehicleTypeMulti: QueryParamComponent<VehicleTypeCodes[]>;

  @IsString()
  @OasisQueryParamTarget('name', 'search')
  searchName: QueryParamComponent<string>;

  @OrderBy()
  @OasisQueryParamTarget('name', 'orderby')
  orderbyName: QueryParamComponent<string>;

  @IsString()
  @OasisQueryParamTarget('address1_city', 'search')
  searchCity: QueryParamComponent<string>;

  @OrderBy()
  @OasisQueryParamTarget('address1_city', 'orderby')
  orderbyCity: QueryParamComponent<string>;

  @IsString()
  @OasisQueryParamTarget('address1_postalcode', 'search')
  searchPostalcode: QueryParamComponent<string>;

  @OrderBy()
  @OasisQueryParamTarget('address1_postalcode', 'orderby')
  orderbyPostalcode: QueryParamComponent<string>;
}
