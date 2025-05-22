import { Expose, Type } from 'class-transformer';
import { OasisAccountToPartnerDto } from './oasis-account-to-partner.dto';
import {
  PaginationResult,
  TransformedOasisResponse,
} from 'src/oasis/oasis-common/interfaces';

export class GetPartnersResponseDto
  implements TransformedOasisResponse<OasisAccountToPartnerDto>
{
  @Expose()
  @Type(() => OasisAccountToPartnerDto)
  value: OasisAccountToPartnerDto[];

  @Expose()
  pagination?: PaginationResult;
}
