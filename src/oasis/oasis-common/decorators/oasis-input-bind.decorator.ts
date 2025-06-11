import { Transform } from 'class-transformer';

/**
 * Decorator that transforms a GUID into an OData binding format
 * @param entityName - The name of the OData entity to bind to (e.g. 'accounts')
 * @returns A class-transformer decorator that performs the transformation
 * @example
 * ```typescript
 * class MyDto {
 *   @OasisBind('accounts')
 *   agencyId: string; // Will transform "123e4567-e89b-12d3-a456-426614174000" to "/accounts(123e4567-e89b-12d3-a456-426614174000)"
 * }
 * ```
 */
export function OasisBind(entityName: string) {
  return Transform(({ value }: { value: string }) => {
    if (!value) return value;

    return `/${entityName}(${value})`;
  });
}
