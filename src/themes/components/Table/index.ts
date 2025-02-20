import { ComponentStyleConfig } from '@chakra-ui/react';

export const Table: ComponentStyleConfig = {
  baseStyle: {
    table: {
      bg: 'midNightBlue',
      th: { border: 'none' },
      td: { border: 'none' },
    },
  },
  variants: {
    striped: {
      tbody: {
        tr: {
          '&:nth-of-type(odd) td': {
            background: 'darkBlue',
          },
        },
      },
    },
  },
  defaultProps: {
    variant: 'striped',
  },
};
