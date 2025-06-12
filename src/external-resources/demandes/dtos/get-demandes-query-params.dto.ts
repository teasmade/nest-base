import { BaseExternalResourceQueryParamsDTO } from 'src/external-resources/common/dtos/base-query-params.dto';
import { IsOptional, IsString } from 'class-validator';
import { OasisQueryParamTarget } from 'src/external-resources/common/decorators';
import { QueryParamComponent } from 'src/external-resources/common/types/query-param-component.type';

export class GetDemandesQueryParamsDTO extends BaseExternalResourceQueryParamsDTO {
  @IsOptional()
  @IsString()
  @OasisQueryParamTarget('title', 'search')
  searchTitle?: QueryParamComponent<string>;
}
