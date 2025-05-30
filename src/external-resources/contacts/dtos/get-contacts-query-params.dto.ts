import { IsEnum, IsOptional } from 'class-validator';
import {
  contactTypeCodeMap,
  ContactTypes,
} from 'src/oasis/oasis-common/enums/contacts.enum';
import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';

export class GetContactsQueryParamsDTO extends BaseExternalResourceQueryParamsDTO {
  @IsOptional()
  @IsEnum(Object.keys(contactTypeCodeMap), {
    message: () =>
      'Type must be one of the following: ' +
      Object.keys(contactTypeCodeMap).join(', '),
  })
  type?: ContactTypes;
}
