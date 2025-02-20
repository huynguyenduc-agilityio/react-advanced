import { extendTheme } from '@chakra-ui/react';

import { bases } from './bases';
import { components } from './components';

const customTheme = extendTheme({
  ...bases,
  components,
});

export default customTheme;
