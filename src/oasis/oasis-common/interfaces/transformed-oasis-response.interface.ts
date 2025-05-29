import { PaginationResult } from './';

/**
 * Represents the format we use to present OASIS API responses to the client.
 * @usageNotes
 * - The base response DTO used for responses transforming OASIS data implements this interface.
 * - Controller methods can type their return values with this interface to represent the transformation operation more clearly e.g. ```async getPartners(): Promise<TransformedOasisResponse<OasisAccountToPartnerDto>>```
 * @remarks
 * We can't directly define DTO classes with this generic typing because class-transformer needs to compile to specific known types for serialization to work.
 */
export interface TransformedOasisResponse<T> {
  value: T[];
  pagination?: PaginationResult;
}
