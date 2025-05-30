/***
 * Utility type used to exclude OData values from an interface.
 * This is used in type assertions to ensure that the interface we use
 * to type the response from OASIS corresponds with the values we use
 * to build the select query params.
 */
export type ExcludeODataValues<T> = {
  [K in keyof T as K extends
    | '@odata.etag'
    | '@odata.context'
    | `${string}@OData.Community.Display.V1.FormattedValue`
    ? never
    : K]: T[K];
};

/**
 * Utility type used to assert that the keys of two interfaces match.
 * Provides the names of missing keys in the resolved type.
 * @linting `// eslint-disable-next-line @typescript-eslint/no-unused-vars`
 * @usage `const _test: AssertInterfaceKeysMatch<LeftInterface, RightInterface> = true;`
 */
export type AssertInterfaceKeysMatch<TLeft, TRight> =
  keyof TLeft extends keyof TRight
    ? keyof TRight extends keyof TLeft
      ? true
      : {
          error: 'Interfaces do not match';
          leftMissingKeys: Exclude<keyof TRight, keyof TLeft>;
          rightMissingKeys: Exclude<keyof TLeft, keyof TRight>;
        }
    : {
        error: 'Interfaces do not match';
        leftMissingKeys: Exclude<keyof TRight, keyof TLeft>;
        rightMissingKeys: Exclude<keyof TLeft, keyof TRight>;
      };
