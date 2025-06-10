import { IsEnum, IsOptional } from 'class-validator';
import { ContactTypeCodes } from 'src/oasis/oasis-common/enums/contacts.enum';
import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { OasisQueryParamTarget } from 'src/external-resources/common/decorators';
import { QueryParamComponent } from 'src/external-resources/common/types/query-param-component.type';

export class GetContactsQueryParamsDTO extends BaseExternalResourceQueryParamsDTO {
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ContactTypeCodes)
  @OasisQueryParamTarget('cap_type_contact_code', 'filter')
  filterType?: QueryParamComponent<ContactTypeCodes>;

  @IsOptional()
  @IsString()
  @OasisQueryParamTarget('telephone1', 'search')
  searchPhone?: QueryParamComponent<string>;

  @IsOptional()
  @IsString()
  @OasisQueryParamTarget('lastname', 'search')
  searchLastName?: QueryParamComponent<string>;

  @IsOptional()
  @IsString()
  @OasisQueryParamTarget('emailaddress1', 'search')
  searchEmail?: QueryParamComponent<string>;

  @IsOptional()
  @IsString()
  @OasisQueryParamTarget('birthdate', 'filter')
  filterBirthdate?: QueryParamComponent<string>;
}
