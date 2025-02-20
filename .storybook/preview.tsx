import React from 'react';
import type { Preview } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

// Themes
import customTheme from '../src/themes/index';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ChakraProvider theme={customTheme}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </ChakraProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
