import { useCallback } from 'react';

export const usePagination = (
  pageCount: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setPageSize: React.Dispatch<React.SetStateAction<number>>,
) => {
  const isDisablePrev = currentPage <= 1;

  const isDisableNext = currentPage === pageCount;

  const handleChangePage = useCallback(
    (direction: string) => {
      setCurrentPage(direction === 'prev' ? currentPage - 1 : currentPage + 1);
    },
    [currentPage, setCurrentPage],
  );

  const handleChangeLimit = useCallback(
    (limit: number) => {
      setPageSize(limit);
      setCurrentPage(1);
    },
    [setCurrentPage, setPageSize],
  );

  return {
    isDisableNext,
    isDisablePrev,
    handleChangeLimit,
    handleChangePage,
  };
};
