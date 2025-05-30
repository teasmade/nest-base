import { Expose, Type } from 'class-transformer';
import {
  PaginationResult,
  TransformedOasisResponse,
} from 'src/oasis/oasis-common/interfaces';

/**
 * This is the base response DTO used for responses transforming OASIS data.
 * @remarks
 * - DTOs used for responses transforming OASIS data should extend this class.
 * @usageNotes DTOs extending this class need to declare the `value` property with the `@Type(() => Object)` decorator and a `declare value: T[];` override of the base `value` property.
 */
export abstract class BaseExternalResourceResponseDto<T, V = T | T[]>
  implements TransformedOasisResponse<T, V>
{
  @Expose()
  @Type(() => Object)
  value: V;

  @Expose()
  pagination?: PaginationResult;
}
