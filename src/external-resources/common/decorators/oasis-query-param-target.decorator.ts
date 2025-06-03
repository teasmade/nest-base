import { Transform } from 'class-transformer';
import { QueryParamComponents } from '../types/query-param-components.type';

/**
 * This decorator is used to provide a QueryParamComponents object on the target property, for ease of use building OData query params strings in the external resources layer.
 * @Usage the decorated property should be typed with `QueryParamComponents<T>`
 */
function OasisQueryParamTarget(
  targetOasisProperty: string,
  type: 'filter' | 'search' | 'orderby',
) {
  return function (target: object, propertyKey: string) {
    Transform(
      ({
        value,
      }: {
        value: unknown;
      }): QueryParamComponents<unknown> | undefined => {
        if (value === undefined) {
          return undefined;
        }
        return { type, target: targetOasisProperty, value };
      },
      { groups: ['transform'] },
    )(target, propertyKey);
  };
}

export { OasisQueryParamTarget };
