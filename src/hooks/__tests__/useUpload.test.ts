import { renderHook } from '@testing-library/react';
import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '@/services';
import { useUploadImage } from '../useUpload';

jest.mock('@/services', () => ({
  uploadFile: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
}));

const mockFile = new File(['file contents'], 'file.png', {
  type: 'image/png',
});

describe('useUploadImage', () => {
  it('should return a handleUploadImage function from useMutation', async () => {
    const mockUploadFile = jest.fn();
    const mockMutateAsync = jest.fn();

    (uploadFile as jest.Mock).mockImplementation(mockUploadFile);
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });

    const { result } = renderHook(() => useUploadImage());

    expect(result.current).toHaveProperty('handleUploadImage');
    expect(typeof result.current.handleUploadImage).toBe('function');

    await result.current.handleUploadImage(mockFile);

    expect(mockMutateAsync).toHaveBeenCalledWith(mockFile);
  });

  it('should invoke uploadFile when handleUploadImage is called', async () => {
    const mockMutateAsync = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });

    const { result } = renderHook(() => useUploadImage());

    await result.current.handleUploadImage(mockFile);

    expect(mockMutateAsync).toHaveBeenCalledWith(mockFile);
    expect(mockMutateAsync).toHaveBeenCalledTimes(1);
  });

  it('should handle errors gracefully', async () => {
    const mockError = new Error('Upload failed');
    const mockMutateAsync = jest.fn().mockRejectedValue(mockError);

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });

    const { result } = renderHook(() => useUploadImage());

    await expect(result.current.handleUploadImage(mockFile)).rejects.toThrow(
      'Upload failed',
    );
    expect(mockMutateAsync).toHaveBeenCalledWith(mockFile);
  });
});
