import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import MainLayout from '@/layouts/MainLayout';

const AppLayout = () => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return <MainLayout />;
};

export default AppLayout;
