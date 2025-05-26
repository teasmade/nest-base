/***
 * Utility type used to exclude OData values from an interface.
 * This is used in type assertions to ensure that the interface we use
 * to type the response from OASIS corresponds with the values we use
 * to build the select query params.
 */
export type ExcludeODataValues<T> = {
  [K in keyof T as K extends
    | '@odata.etag'
    | `${string}@OData.Community.Display.V1.FormattedValue`
    ? never
    : K]: T[K];
};
