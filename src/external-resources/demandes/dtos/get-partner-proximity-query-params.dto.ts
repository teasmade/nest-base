import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { BasePartnersQueryParamsDTO } from 'src/external-resources/partners/common/dtos/base-partners-query-params.dto';
import { PickType } from '@nestjs/mapped-types';

export enum ProximityTarget {
  MISSION = 'mission',
  DOMICILE = 'domicile',
}

export class GetPartnerProximityQueryParamsDTO extends PickType(
  BasePartnersQueryParamsDTO,
  [
    'filterServicePointType',
    'filterRentalStructureType',
    'partnerFilterVehicleTypeMulti',
  ] as const,
) {
  @IsNotEmpty()
  filterServicePointType: BasePartnersQueryParamsDTO['filterServicePointType'];

  @IsOptional()
  filterRentalStructureType: BasePartnersQueryParamsDTO['filterRentalStructureType'];

  @IsOptional()
  partnerFilterVehicleTypeMulti: BasePartnersQueryParamsDTO['partnerFilterVehicleTypeMulti'];

  @IsOptional()
  @IsEnum(ProximityTarget)
  proximityTarget: ProximityTarget = ProximityTarget.DOMICILE;
}
