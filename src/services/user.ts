import { QueryFunctionContext } from '@tanstack/react-query';

// Constants
import { API_PATHS, HTTP_METHOD, usersQueryKeys } from '@/constants';

// Types
import { IUserModel, Status as StatusEnum } from '@/types';

// Services
import { apiRequest } from '@/services';

export const getUsers = async ({
  queryKey: [{ page, pageSize, filter }],
}: QueryFunctionContext<ReturnType<(typeof usersQueryKeys)['list']>>) => {
  const { search = '' } = filter || {};
  // Implement search by user name
  const searchParam = search ? `&name=${search}` : '';

  const url = `${API_PATHS.USERS}?${searchParam}`;

  const response = await apiRequest<IUserModel[]>(HTTP_METHOD.GET, url);

  // Implement pagination on the client side
  const startIndex = (page - 1) * pageSize;
  const paginatedItems = response.slice(startIndex, startIndex + pageSize);

  const formatItems = paginatedItems.map((data) => {
    return {
      ...data,
      status: data.status ? StatusEnum.Online : StatusEnum.Offline,
    };
  });

  return {
    items: formatItems,
    meta: {
      pagination: {
        total: response.length,
        pageCount: Math.ceil(response.length / pageSize),
        pageSize,
        page,
      },
    },
  };
};

export const getUser = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof usersQueryKeys)['detail']>>) => {
  const url = `${API_PATHS.USERS}/${id}`;

  return await apiRequest<IUserModel>(HTTP_METHOD.GET, url);
};

export const addUser = async (data: Partial<IUserModel>) =>
  await apiRequest<Partial<IUserModel>>(
    HTTP_METHOD.POST,
    API_PATHS.USERS,
    data,
  );

export const editUser = async (data: Partial<IUserModel>) =>
  await apiRequest<Partial<IUserModel>>(
    HTTP_METHOD.PUT,
    `${API_PATHS.USERS}/${data.id}`,
    data,
  );

export const deleteUser = async (id: string) =>
  await apiRequest(HTTP_METHOD.DELETE, `${API_PATHS.USERS}/${id}`);

export const deleteMultipleUsers = async (ids: string[]) => {
  for (const id of ids) {
    await deleteUser(id);
  }
};
