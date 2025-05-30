import {
  IsNumber,
  Matches,
  Max,
  Min,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  AccountSearchQuery,
  AccountTypes,
  AccountsCategories,
  accountCategoryCodeMap,
  accountTypeCodeMap,
} from 'src/oasis/oasis-common/enums/accounts.enum';

export class PartnerQueryParamsDTO {
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
  @IsEnum(Object.keys(accountTypeCodeMap), {
    message: () =>
      'Type must be one of the following: ' +
      Object.keys(accountTypeCodeMap).join(', '),
  })
  type?: AccountTypes;

  @IsOptional()
  @IsEnum(Object.keys(accountCategoryCodeMap), {
    message: 'Bad category',
  })
  category?: AccountsCategories;

  @IsOptional()
  @Matches(/^(name|city|postalcode):[^:]+$/)
  search?: AccountSearchQuery;
}
