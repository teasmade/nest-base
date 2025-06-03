export type QueryParamComponents<T> = {
  type: 'filter' | 'search' | 'orderby';
  target: string;
  value: T;
};
