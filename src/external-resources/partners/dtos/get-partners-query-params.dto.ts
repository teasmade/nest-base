import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';
import { Matches, IsEnum, IsOptional } from 'class-validator';
import {
  AccountSearchQuery,
  AccountTypes,
  AccountsCategories,
  accountCategoryCodeMap,
  accountTypeCodeMap,
} from 'src/oasis/oasis-common/enums/accounts.enum';

export class GetPartnersQueryParamsDTO extends BaseExternalResourceQueryParamsDTO {
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
