export interface PaginationSession {
  id: string;
  navigation: {
    [pageNumber: number]: string;
  };
  currentPage: number;
}
