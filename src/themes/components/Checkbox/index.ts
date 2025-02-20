import { ComponentStyleConfig } from '@chakra-ui/react';

export const Checkbox: ComponentStyleConfig = {
  baseStyle: {
    control: {
      border: '0.6px solid',
      borderColor: 'slateBlue',
      bgColor: 'midNightBlue',
      _checked: {
        bgColor: 'primary',
        borderColor: 'primary',
        _hover: { borderColor: 'primary', bgColor: 'primary' },
      },
      _indeterminate: {
        border: '0.6px solid',
        borderColor: 'primary !important',
        bgColor: 'midNightBlue',
      },
    },
  },
};
