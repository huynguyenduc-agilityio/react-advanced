import { Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

// Layouts
import { AppLayout } from '@/layouts';

// Components
import { Fallback } from '@/components';

// Pages
import { InternalServerError } from '@/pages';

// Routers
import { PUBLIC_ROUTES } from './routers';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path={PUBLIC_ROUTERS.ROOT}
        element={<Navigate to={PUBLIC_ROUTERS.REPORT} replace />}
      />
      {PUBLIC_ROUTES.map(({ path, Component, title }) => (
        <Route
          key={path}
          element={<AppLayout />}
          errorElement={<InternalServerError />}
        >
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Fallback />}>
                <Component />
              </Suspense>
            }
            loader={() => ({ title })}
          />
        </Route>
      ))}
    </Route>,
  ),
) as ReturnType<typeof createBrowserRouter>;
