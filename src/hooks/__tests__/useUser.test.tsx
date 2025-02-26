import { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

// Services
import {
  addUser,
  deleteMultipleUsers,
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from '@/services';

// Hooks
import {
  useCreateUser,
  useDeleteMultipleUsers,
  useDeleteUser,
  useGetUser,
  useGetUsers,
  useUpdateUser,
} from '../useUser';

// Mocks
import { mockUsers } from '@/__mocks__';

// Constants
import { usersQueryKeys } from '@/constants';

jest.mock('@/services', () => ({
  getUsers: jest.fn(),
  getUser: jest.fn(),
  addUser: jest.fn(),
  editUser: jest.fn(),
  deleteUser: jest.fn(),
  deleteMultipleUsers: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));

const mockQueryClient = {
  getQueriesData: jest.fn(),
  invalidateQueries: jest.fn(),
  setQueryData: jest.fn(),
};

describe('useUser', () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return users correctly', async () => {
    (getUsers as jest.Mock).mockResolvedValue(mockUsers);

    const { result } = renderHook(
      () => useGetUsers({ page: 1, pageSize: 10, filter: {} }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.users).toEqual(mockUsers);
    });
  });

  it('should return user details correctly', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUsers.items[0]);

    const { result } = renderHook(() => useGetUser(mockUsers.items[0].id), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUsers.items[0]);
    });
  });

  it('should handle user creation correctly', async () => {
    const mockUser = mockUsers.items[0];
    (addUser as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useCreateUser(), { wrapper });

    await result.current.handleCreateUser(mockUser);

    await waitFor(() => {
      expect(addUser).toHaveBeenCalledWith(mockUser);
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: usersQueryKeys.lists(),
      });
    });
  });

  it('should handle user update correctly', async () => {
    const mockUser = mockUsers.items[0];
    (editUser as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    await result.current.handleUpdateUser(mockUser);

    await waitFor(() => {
      expect(editUser).toHaveBeenCalledWith(mockUser);
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: usersQueryKeys.lists(),
      });
    });
  });

  it('should handle user deletion correctly', async () => {
    const mockUserId = mockUsers.items[0].id;
    (deleteUser as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useDeleteUser(), { wrapper });

    await result.current.handleDeleteUser(mockUserId);

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith(mockUserId);
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: usersQueryKeys.lists(),
      });
    });
  });

  it('should handle multiple user deletions correctly', async () => {
    const mockUserIds = mockUsers.items.map((user) => user.id);
    (deleteMultipleUsers as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useDeleteMultipleUsers(), { wrapper });

    await result.current.handleDeleteMultipleUsers(mockUserIds);

    await waitFor(() => {
      expect(deleteMultipleUsers).toHaveBeenCalledWith(mockUserIds);
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: usersQueryKeys.lists(),
      });
    });
  });
});
