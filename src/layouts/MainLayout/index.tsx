import { Outlet } from 'react-router-dom';

// Contexts
import { ConfirmationDialogProvider } from '@/contexts';

// Components
import { ConfirmDialog, Navbar } from '@/components';

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
