import { ComponentStyleConfig } from '@chakra-ui/react';

export const Select: ComponentStyleConfig = {
  baseStyle: {
    field: {
      fontSize: 'sm',
      border: '0.6px solid',
      borderRadius: '4px',
      borderColor: 'slateBlue',
      bgColor: 'midNightBlue',
      cursor: 'pointer',
      _placeholder: {
        color: 'pastelBlue',
      },
      _hover: {
        borderColor: 'white',
        transition: '0.5s',
      },
      _invalid: {
        borderColor: 'red',
        _focus: {
          borderColor: 'red',
        },
      },
    },
  },
};
