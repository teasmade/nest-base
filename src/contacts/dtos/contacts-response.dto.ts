import { Expose, Type } from 'class-transformer';
import { OasisContactToContactDto } from './oasis-contact-to-contact.dto';
import {
  PaginationResult,
  TransformedOasisResponse,
} from 'src/oasis/oasis-common/interfaces';

export class GetContactsResponseDto
  implements TransformedOasisResponse<OasisContactToContactDto>
{
  @Expose()
  @Type(() => OasisContactToContactDto)
  value: OasisContactToContactDto[];

  @Expose()
  pagination?: PaginationResult;
}
