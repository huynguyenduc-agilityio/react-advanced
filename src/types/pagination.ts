export interface PaginationTableType {
  currentPage: number;
  totalPage: number;
}

export interface TPagination<T> {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  items: T[];
}
