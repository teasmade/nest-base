export type QueryParamComponent<T> = {
  type: 'filter' | 'search' | 'orderby';
  target: string;
  value: T;
};
