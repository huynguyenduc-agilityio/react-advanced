import { HTTP_METHOD } from '@/constants';
import { apiRequest } from '../api';

global.fetch = jest.fn();

describe('apiRequest', () => {
  const BASE_URL = process.env.VITE_API_ENDPOINT || '';
  const mockPath = '/mock-path';
  const mockData = { key: 'value' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request and parse the response correctly', async () => {
    const mockResponse = { success: true };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValue(JSON.stringify(mockResponse)),
    });

    const result = await apiRequest(HTTP_METHOD.GET, mockPath);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${mockPath}`, {
      method: HTTP_METHOD.GET,
    });
    expect(result).toEqual(mockResponse);
  });

  it('should make a POST request with correct payload', async () => {
    const mockResponse = { success: true };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValue(JSON.stringify(mockResponse)),
    });

    const result = await apiRequest(HTTP_METHOD.POST, mockPath, mockData);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${mockPath}`, {
      method: HTTP_METHOD.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockData),
    });
    expect(result).toEqual(mockResponse);
  });

  it('should handle an empty response gracefully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValue(''),
    });

    const result = await apiRequest(HTTP_METHOD.GET, mockPath);

    expect(result).toEqual({});
  });

  it('should throw an error if the response is not OK', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: jest.fn().mockResolvedValue(''),
    });

    await expect(apiRequest(HTTP_METHOD.GET, mockPath)).rejects.toThrow(
      'HTTP error! status: 404',
    );
  });

  it('should throw an error if fetch fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(apiRequest(HTTP_METHOD.GET, mockPath)).rejects.toThrow(
      'Network error',
    );
  });
});
