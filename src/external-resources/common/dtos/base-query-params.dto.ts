import {
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Base query params DTO for external resources.
 * @remarks
 * - This class provides validation decorators for pagination-related query params.
 */
export abstract class BaseExternalResourceQueryParamsDTO {
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
}
