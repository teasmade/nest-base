export interface TransformedResponse<T> {
  responseTime: string;
  requestDuration: number;
  payload: T;
}
