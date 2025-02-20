// Type
import { TQueryKey } from '@/types';

export const usersQueryKeys = {
  all: [{ scope: 'users' }] as const,
  lists: () => [{ ...usersQueryKeys.all[0], entity: 'list' }] as const,
  list: ({ page, pageSize, filter }: TQueryKey) =>
    [
      {
        ...usersQueryKeys.lists()[0],
        page,
        pageSize,
        ...(filter && { filter }),
      },
    ] as const,
  details: () => [{ ...usersQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) => [{ ...usersQueryKeys.details()[0], id }] as const,
};
