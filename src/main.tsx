import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, UseToastOptions } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Constants
import { REACT_QUERY } from '@/constants';

// Components
import App from './App';

// Themes
import customTheme from './themes';
import Fonts from './themes/fonts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: REACT_QUERY.STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
});

const defaulToastOptions = {
  defaultOptions: {
    duration: 3000,
    isClosable: true,
  } as UseToastOptions,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme} toastOptions={defaulToastOptions}>
      <QueryClientProvider client={queryClient}>
        <Fonts />
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
