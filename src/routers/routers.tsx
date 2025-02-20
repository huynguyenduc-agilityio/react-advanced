// Types
import { IRoute } from '@/types';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

// Pages
import { Dashboard, NotFound, UserForm } from '@/pages';

export const PUBLIC_ROUTES: IRoute[] = [
  {
    path: PUBLIC_ROUTERS.REPORT,
    Component: Dashboard,
    title: 'Report',
  },
  {
    path: PUBLIC_ROUTERS.NOT_FOUND,
    Component: NotFound,
    title: 'Not Found',
  },
  {
    path: PUBLIC_ROUTERS.USER_ADD,
    Component: UserForm,
    title: 'Add New User',
  },
  {
    path: PUBLIC_ROUTERS.USER_EDIT,
    Component: UserForm,
    title: 'Edit User',
  },
];
