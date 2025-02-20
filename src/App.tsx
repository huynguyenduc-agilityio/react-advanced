import { RouterProvider } from 'react-router-dom';

// Routers
import { router } from '@/routers';

// Components
import { ErrorBoundary } from '@/components';

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
