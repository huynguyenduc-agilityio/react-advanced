import { QueryFunctionContext } from '@tanstack/react-query';

// Constants
import { HTTP_METHOD, API_PATHS, usersQueryKeys } from '@/constants';

// Types
import { Status as StatusEnum } from '@/types';

// Services
import {
  apiRequest,
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
  deleteMultipleUsers,
} from '@/services';

// Mocks
import { mockInitialValuesUser } from '@/__mocks__';

jest.mock('@/services/api');

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getUsers should fetch users and apply pagination', async () => {
    const mockUsers = [mockInitialValuesUser];
    (apiRequest as jest.Mock).mockResolvedValue(mockUsers);

    const queryKey = [
      {
        scope: 'users',
        entity: 'list',
        page: 1,
        pageSize: 1,
        filter: { search: 'John' },
      },
    ] as const;
    const result = await getUsers({
      queryKey,
      meta: undefined,
    } as QueryFunctionContext<ReturnType<typeof usersQueryKeys.list>>);

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.GET,
      `${API_PATHS.USERS}?&name=John`,
    );
    expect(result.items).toHaveLength(1);
    expect(result.items[0].status).toBe(StatusEnum.Online);
    expect(result.meta.pagination.total).toBe(1);
  });

  test('getUsers should return users with status Offline', async () => {
    const mockOfflineUser = {
      ...mockInitialValuesUser,
      status: StatusEnum.Offline,
    };
    (apiRequest as jest.Mock).mockResolvedValue([mockOfflineUser]);

    const queryKey = [
      {
        scope: 'users',
        entity: 'list',
        page: 1,
        pageSize: 1,
        filter: { search: 'Jane' },
      },
    ] as const;
    const result = await getUsers({
      queryKey,
      meta: undefined,
    } as QueryFunctionContext<ReturnType<typeof usersQueryKeys.list>>);

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.GET,
      `${API_PATHS.USERS}?&name=Jane`,
    );
    expect(result.items).toHaveLength(1);
    expect(result.items[0].status).toBe(StatusEnum.Offline);
  });

  test('getUsers should fetch users without search filter', async () => {
    const mockUsers = [mockInitialValuesUser];
    (apiRequest as jest.Mock).mockResolvedValue(mockUsers);

    const queryKey = [
      { scope: 'users', entity: 'list', page: 1, pageSize: 1, filter: {} },
    ] as const;
    const result = await getUsers({ queryKey } as QueryFunctionContext<
      ReturnType<typeof usersQueryKeys.list>
    >);

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.GET,
      `${API_PATHS.USERS}?`,
    );
    expect(result.items).toHaveLength(1);
  });

  test('getUser should fetch user by ID', async () => {
    (apiRequest as jest.Mock).mockResolvedValue(mockInitialValuesUser);

    const queryKey = [{ scope: 'users', entity: 'detail', id: '1' }] as const;
    const result = await getUser({ queryKey } as QueryFunctionContext<
      ReturnType<typeof usersQueryKeys.detail>
    >);

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.GET,
      `${API_PATHS.USERS}/1`,
    );
    expect(result).toEqual(mockInitialValuesUser);
  });

  test('addUser should send a POST request', async () => {
    (apiRequest as jest.Mock).mockResolvedValue(mockInitialValuesUser);

    const result = await addUser(mockInitialValuesUser);

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.POST,
      API_PATHS.USERS,
      mockInitialValuesUser,
    );
    expect(result).toEqual(mockInitialValuesUser);
  });

  test('editUser should send a PUT request', async () => {
    (apiRequest as jest.Mock).mockResolvedValue(mockInitialValuesUser);

    const result = await editUser(mockInitialValuesUser);

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.PUT,
      `${API_PATHS.USERS}/${mockInitialValuesUser.id}`,
      mockInitialValuesUser,
    );
    expect(result).toEqual(mockInitialValuesUser);
  });

  test('deleteUser should send a DELETE request', async () => {
    (apiRequest as jest.Mock).mockResolvedValue({});

    await deleteUser('1');

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.DELETE,
      `${API_PATHS.USERS}/1`,
    );
  });

  test('deleteMultipleUsers should call deleteUser for each ID', async () => {
    (apiRequest as jest.Mock).mockResolvedValue({});

    await deleteMultipleUsers(['1', '2']);

    expect(apiRequest).toHaveBeenCalledTimes(2);
    expect(apiRequest).toHaveBeenNthCalledWith(
      1,
      HTTP_METHOD.DELETE,
      `${API_PATHS.USERS}/1`,
    );
    expect(apiRequest).toHaveBeenNthCalledWith(
      2,
      HTTP_METHOD.DELETE,
      `${API_PATHS.USERS}/2`,
    );
  });
});
