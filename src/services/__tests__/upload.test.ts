import { ERROR_MESSAGES } from '@/constants';
import { uploadFile } from '../upload';

describe('uploadFile', () => {
  const mockFile = new File(['file contents'], 'file.png', {
    type: 'image/png',
  });

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('uploads the file and returns the image URL on success', async () => {
    const mockUrl = 'https://example.com/image.png';
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: {
          image: {
            url: mockUrl,
          },
        },
      }),
    };

    (global.fetch as jest.Mock).mockResolvedValue(
      mockResponse as unknown as Response,
    );

    const result = await uploadFile(mockFile);
    expect(result).toBe(mockUrl);
    expect(global.fetch).toHaveBeenCalled();
  });

  it('throws an error when the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse as Response);

    await expect(uploadFile(mockFile)).rejects.toThrow(
      ERROR_MESSAGES.UPLOAD_IMAGE_FAILED,
    );
  });

  it('returns an empty string if the image URL is not present in the response', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: {
          image: {},
        },
      }),
    };

    (global.fetch as jest.Mock).mockResolvedValue(
      mockResponse as unknown as Response,
    );

    const result = await uploadFile(mockFile);
    expect(result).toBe('');
  });
});
