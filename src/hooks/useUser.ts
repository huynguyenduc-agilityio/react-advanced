import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Services
import {
  addUser,
  deleteMultipleUsers,
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from '@/services';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES, usersQueryKeys } from '@/constants';

// Enums
import { ToastStatus } from '@/enums';

// Components
import { useCustomToast } from './useCustomToast';

interface IUseUser {
  page: number;
  pageSize: number;
  filter?: Record<string, string>;
}

export const useGetUsers = ({ page, pageSize, filter }: IUseUser) => {
  const { data: users, isFetching: isUsersLoading } = useQuery({
    queryKey: [...usersQueryKeys.list({ page, pageSize, filter })] as const,
    queryFn: getUsers,
  });

  return { users, isUsersLoading };
};

export const useGetUser = (id: string) => {
  const { data: user, isFetching: isUserLoading } = useQuery({
    queryKey: [...usersQueryKeys.detail(id)] as const,
    queryFn: getUser,
  });

  return { user, isUserLoading };
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const { mutateAsync: handleCreateUser, isLoading: isCreateLoading } =
    useMutation({
      mutationFn: addUser,
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() });

        if (response.id) {
          queryClient.setQueryData(
            usersQueryKeys.detail(response.id),
            response,
          );
        }

        showToast({
          status: ToastStatus.Success,
          message: SUCCESS_MESSAGES.ADD_USER,
        });
      },
      onError: () => {
        showToast({
          status: ToastStatus.Error,
          message: ERROR_MESSAGES.ADD_USER,
        });
      },
    });

  return { handleCreateUser, isCreateLoading };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const { mutateAsync: handleUpdateUser, isLoading: isUpdateLoading } =
    useMutation({
      mutationFn: editUser,
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() });

        if (response.id) {
          queryClient.setQueryData(
            usersQueryKeys.detail(response.id),
            response,
          );
        }

        showToast({
          status: ToastStatus.Success,
          message: SUCCESS_MESSAGES.UPDATE_USER,
        });
      },
      onError: () => {
        showToast({
          status: ToastStatus.Error,
          message: ERROR_MESSAGES.UPDATE_USER,
        });
      },
    });

  return { handleUpdateUser, isUpdateLoading };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteUser, isLoading: isDeleteLoading } =
    useMutation({
      mutationFn: deleteUser,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.lists(),
        }),
    });

  return { handleDeleteUser, isDeleteLoading };
};

export const useDeleteMultipleUsers = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: handleDeleteMultipleUsers,
    isLoading: isDeleteMultipleLoading,
  } = useMutation({
    mutationFn: deleteMultipleUsers,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.lists(),
      }),
  });

  return { handleDeleteMultipleUsers, isDeleteMultipleLoading };
};
