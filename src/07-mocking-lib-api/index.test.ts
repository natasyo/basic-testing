import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();
  const mockCreate = axios.create as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockCreate.mockReturnValue({
      get: mockGet,
    });
  });

  test('should create instance with provided base url', async () => {
    mockGet.mockResolvedValue({ data: 'test-data' });

    await throttledGetDataFromApi('/posts');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGet.mockResolvedValue({ data: 'test-data' });

    await throttledGetDataFromApi('/posts/1');

    expect(mockGet).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const responseData = { id: 1, title: 'test post' };
    mockGet.mockResolvedValue({ data: responseData });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(responseData);
  });
});
