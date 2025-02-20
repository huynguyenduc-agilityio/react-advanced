import { useMutation } from '@tanstack/react-query';

// Services
import { uploadFile } from '@/services';

export const useUploadImage = () => {
  const { mutateAsync: handleUploadImage } = useMutation({
    mutationFn: uploadFile,
  });

  return { handleUploadImage };
};
