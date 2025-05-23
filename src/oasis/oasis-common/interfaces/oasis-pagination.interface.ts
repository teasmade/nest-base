import { OasisResponse } from './oasis-response.interface';

export interface PaginationResult {
  paginationSessionId: string;
  currentPage: number;
  totalItems: number | null;
}

export interface PaginatedOasisResponse<T> {
  data: OasisResponse<T>;
  pagination?: PaginationResult;
}

export interface PaginationSession {
  navigation: {
    [pageNumber: number]: string;
  };
  currentPage: number;
}
