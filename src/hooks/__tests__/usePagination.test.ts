import { act, renderHook } from '@testing-library/react';
import { usePagination } from '../usePagination';

describe('usePagination', () => {
  const setCurrentPageMock = jest.fn();
  const setPageSizeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct values', () => {
    const { result } = renderHook(() =>
      usePagination(3, 1, setCurrentPageMock, setPageSizeMock),
    );

    expect(result.current.isDisableNext).toBe(false);
    expect(result.current.isDisablePrev).toBe(true);
  });

  it('should change page number correctly', () => {
    const { result } = renderHook(() =>
      usePagination(3, 1, setCurrentPageMock, setPageSizeMock),
    );

    act(() => {
      result.current.handleChangePage('next');
    });
    expect(setCurrentPageMock).toHaveBeenCalledWith(2);

    act(() => {
      result.current.handleChangePage('prev');
    });
    expect(setCurrentPageMock).toHaveBeenCalledWith(0);
  });

  it('should disable prev button when on the first page', () => {
    const { result } = renderHook(() =>
      usePagination(3, 1, setCurrentPageMock, setPageSizeMock),
    );
    expect(result.current.isDisablePrev).toBe(true);
  });

  it('should disable next button when on the last page', () => {
    const { result } = renderHook(() =>
      usePagination(3, 3, setCurrentPageMock, setPageSizeMock),
    );
    expect(result.current.isDisableNext).toBe(true);
  });

  it('should handle page size change correctly', () => {
    const { result } = renderHook(() =>
      usePagination(3, 2, setCurrentPageMock, setPageSizeMock),
    );

    act(() => {
      result.current.handleChangeLimit(20);
    });
    expect(setPageSizeMock).toHaveBeenCalledWith(20);
    expect(setCurrentPageMock).toHaveBeenCalledWith(1);
  });
});
