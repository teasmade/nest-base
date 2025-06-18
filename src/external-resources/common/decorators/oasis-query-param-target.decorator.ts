import { Transform } from 'class-transformer';
import {
  QueryParamComponent,
  QueryParamComponentType,
} from '../types/query-param-component.type';

/**
 * This decorator is used to provide a QueryParamComponent object on the target property, for ease of use building OData query params strings in the external resources layer.
 * @Usage the decorated property should be typed with `QueryParamComponent<T>`
 */
function OasisQueryParamTarget(
  targetOasisProperty: string,
  type: QueryParamComponentType,
) {
  return function (target: object, propertyKey: string) {
    Transform(
      ({
        value,
      }: {
        value: unknown;
      }): QueryParamComponent<unknown> | undefined => {
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
