import { Expose } from 'class-transformer';
import { BaseOasisAccountToPartnerDto } from 'src/external-resources/partners/common/dtos/base-oasis-account-to-partner.dto';
import { ProximityTarget } from './get-partner-proximity-query-params.dto';

/**
 * DTO used to transform Oasis account to partner with distance.
 * This pattern is used to add calculated properties to an Oasis response, while still keeping  the usual Oasis transformation mapping in place.
 */
export class OasisAccountToPartnerWithDistanceDto extends BaseOasisAccountToPartnerDto {
  @Expose({ name: 'proximity_metres' })
  proximity: number;

  @Expose({ name: 'proximity_target' })
  proximityTarget: ProximityTarget = ProximityTarget.DOMICILE;
}
