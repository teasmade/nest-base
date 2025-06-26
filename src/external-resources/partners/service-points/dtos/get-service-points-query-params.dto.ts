import { BasePartnersQueryParamsDTO } from 'src/external-resources/partners/common/dtos/base-partners-query-params.dto';
import { PickType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';

export class GetServicePointQueryParamsDTO extends PickType(
  BasePartnersQueryParamsDTO,
  [
    'filterServicePointType',
    'filterRentalStructureType',
    'partnerFilterVehicleTypeMulti',
  ] as const,
) {
  @IsOptional()
  filterServicePointType: BasePartnersQueryParamsDTO['filterServicePointType'];

  @IsOptional()
  filterRentalStructureType: BasePartnersQueryParamsDTO['filterRentalStructureType'];

  @IsOptional()
  partnerFilterVehicleTypeMulti: BasePartnersQueryParamsDTO['partnerFilterVehicleTypeMulti'];
}
