// Constants
import { ERROR_MESSAGES, HTTP_METHOD } from '@/constants';

const BASE_IMAGE_URL = process.env.VITE_CDN_URL;
const CDN_KEY = process.env.VITE_CDN_KEY;

export const uploadFile = async (file: File): Promise<string> => {
  const form = new FormData();
  form.append('image', file);

  const response = await fetch(`${BASE_IMAGE_URL}?key=${CDN_KEY}`, {
    method: HTTP_METHOD.POST,
    body: form,
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.UPLOAD_IMAGE_FAILED);
  }

  const resData = await response.json();
  return resData.data.image.url || '';
};
