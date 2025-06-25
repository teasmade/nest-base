import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { OasisQueryParamTarget } from 'src/external-resources/common/decorators';
import { QueryParamComponent } from 'src/external-resources/common/types/query-param-component.type';
import {
  ServicePointTypeCodes,
  RentalStructureTypeCodes,
  VehicleTypeCodes,
} from '@oasis/oasis-common/enums/accounts.enum';
import { Type } from 'class-transformer';

export enum ProximityTarget {
  MISSION = 'mission',
  DOMICILE = 'domicile',
}

// NB: we're not extending BaseExternalResourceQueryParamsDTO because we don't want to accept pagination params - proximity comprises a range of calls to different Oasis services and the addition of our own calculalted values; this means we can't use OData generated pagination links.
export class GetPartnerProximityQueryParamsDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsEnum(ServicePointTypeCodes)
  @OasisQueryParamTarget('cap_typedepointdegeolocalisationcode', 'filter')
  filterServicePointType: QueryParamComponent<ServicePointTypeCodes>;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(RentalStructureTypeCodes)
  @OasisQueryParamTarget('cap_typedepartenairepointgeocode', 'filter')
  filterRentalStructureType?: QueryParamComponent<RentalStructureTypeCodes>;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(VehicleTypeCodes)
  @OasisQueryParamTarget('cap_typevehiculecode', 'filter')
  partnerFilterVehicleType?: QueryParamComponent<VehicleTypeCodes>;

  @IsOptional()
  @IsEnum(ProximityTarget)
  proximityTarget: ProximityTarget = ProximityTarget.DOMICILE;
}
