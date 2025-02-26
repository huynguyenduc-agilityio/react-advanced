import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

// Contexts
import { ConfirmationDialogProvider } from '@/contexts';

// Components
import { Navbar } from '@/components';

const ConfirmDialog = lazy(() => import('@/components/ConfirmDialog'));

const MainLayout = () => {
  return (
    <ConfirmationDialogProvider>
      <Navbar>
        <Outlet />
      </Navbar>
      <ConfirmDialog />
    </ConfirmationDialogProvider>
  );
};

export default MainLayout;
