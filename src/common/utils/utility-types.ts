export type AssertTypesMatch<TLeft, TRight> = TLeft extends TRight
  ? TRight extends TLeft
    ? true
    : {
        error: 'Right type has extra properties';
      }
  : {
      error: 'Left type has extra properties';
    };
