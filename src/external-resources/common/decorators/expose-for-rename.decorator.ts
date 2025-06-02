import { Expose, Exclude } from 'class-transformer';
/**
 * This decorator exposes a property when transforming to a class, and excludes it when transforming to a plain object.
 * @usage in DTOs for validating input and mapping it to property names needed in an external API (e.g. OASIS), use `@ExposeForRename` on the source input property. This will ensure that standard class-validator validation via other decorators is performed on the source property. Combine this with `@Rename` , which will map the source property to the target property name needed in the external API.
 */
export function ExposeForRename() {
  return function (target: any, propertyKey: string) {
    Expose({ toClassOnly: true })(target, propertyKey);
    Exclude({ toPlainOnly: true })(target, propertyKey);
  };
}
