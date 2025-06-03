import { IsEnum } from 'class-validator';

/**
 * This decorator just wraps the IsEnum decorator over 'asc' / 'desc'
 * @Usage to validate orderby properties in query params DTOs
 */
function OrderBy() {
  // Decorator just wrapping isEnum over 'asc' / 'desc'
  return function (target: object, propertyKey: string) {
    IsEnum(['asc', 'desc'], {
      message: 'orderBy params must be one of the following: asc, desc',
    })(target, propertyKey);
  };
}

export { OrderBy };
