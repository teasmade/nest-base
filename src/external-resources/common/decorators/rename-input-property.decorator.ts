import { Expose, Transform } from 'class-transformer';
import { Allow } from 'class-validator';

/**
 * This decorator is used to map the value of an input property to a different property name, effectively renaming the property.
 * The renamed property is exposed when transforming the class to a plain object.
 * @usage in DTOs for validating input and mapping it to property names needed in an external API (e.g. OASIS), use `@ExposeForRename` on the source input property. This will ensure that standard class-validator validation via other decorators is performed on the source property. Combine this with `@Rename` , which will map the source property to the target property name needed in the external API.
 */
function RenameInputProperty(sourceProperty: string) {
  return function (target: any, propertyKey: string) {
    Transform(
      ({ obj }: { obj: Record<string, unknown> }) => obj[sourceProperty],
    )(target, propertyKey);
    Expose({ toPlainOnly: true })(target, propertyKey);
    Allow()(target, propertyKey);
  };
}

export { RenameInputProperty as Rename };
