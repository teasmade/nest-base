import {
  IsNumber,
  Max,
  Min,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  contactTypeCodeMap,
  ContactTypes,
} from 'src/oasis/oasis-common/enums/contacts.enum';

export class ContactQueryParamsDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize?: number;

  @IsOptional()
  @IsUUID()
  paginationSessionId?: string;

  @IsOptional()
  @IsEnum(['next', 'prev'])
  direction?: 'next' | 'prev';

  @IsOptional()
  @IsEnum(Object.keys(contactTypeCodeMap), {
    message: () =>
      'Type must be one of the following: ' +
      Object.keys(contactTypeCodeMap).join(', '),
  })
  type?: ContactTypes;

  // @IsOptional()
  // @IsEnum(Object.keys(accountCategoryCodeMap), {
  //   message: 'Bad category',
  // })
  // category?: AccountsCategories;

  // @IsOptional()
  // @Matches(/^(name|city|postalcode):[^:]+$/)
  // search?: AccountSearchQuery;
}
