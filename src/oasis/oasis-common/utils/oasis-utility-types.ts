export type NonODataFormattedValues<T> = {
  [K in keyof T as K extends `${string}@OData.Community.Display.V1.FormattedValue`
    ? never
    : K]: T[K];
};
