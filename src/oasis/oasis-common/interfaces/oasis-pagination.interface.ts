import { OasisResponse } from './oasis-response.interface';

export interface PaginationResult {
  paginationSessionId: string;
  currentPage: number;
}

export interface PaginationResponse<T> {
  data: OasisResponse<T>;
  pagination?: PaginationResult;
}

export interface PaginationSession {
  navigation: {
    [pageNumber: number]: string;
  };
  currentPage: number;
}
