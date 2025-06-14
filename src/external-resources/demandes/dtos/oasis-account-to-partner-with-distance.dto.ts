import { Expose } from 'class-transformer';
import { OasisAccountToPartnerDto } from 'src/external-resources/partners/dtos/oasis-account-to-partner.dto';

/**
 * DTO used to transform Oasis account to partner with distance.
 * This pattern is used to add calculated properties to an Oasis response, while still keeping  the usual Oasis transformation mapping in place.
 */
export class OasisAccountToPartnerWithDistanceDto extends OasisAccountToPartnerDto {
  @Expose()
  distance: number;
}
