import { ComponentStyleConfig } from '@chakra-ui/react';

export const Radio: ComponentStyleConfig = {
  baseStyle: {
    control: {
      border: '0.6px solid',
      borderColor: 'slateBlue',
      bgColor: 'midNightBlue',
      _hover: { borderColor: 'primary' },
      _checked: {
        borderColor: 'primary',
        bgColor: '#3941B0',
        _hover: { borderColor: 'primary', bgColor: '#3941B0' },
      },
      _focus: { borderColor: 'primary', bgColor: '#3941B0' },
    },
  },
};
