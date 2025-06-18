export type QueryParamComponent<T> = {
  type: QueryParamComponentType;
  target: string;
  value: T;
};

export type QueryParamComponentType = 'filter' | 'search' | 'orderby';
