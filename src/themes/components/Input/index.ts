import { defineStyleConfig } from '@chakra-ui/react';

export const Input = defineStyleConfig({
  baseStyle: {
    field: {
      fontSize: 'xs',
      color: 'white',
      border: '0.6px solid',
      backgroundColor: 'midNightBlue',
      borderRadius: 'base',
      borderColor: 'slateBlue',
      _placeholder: {
        color: 'pastelBlue',
      },
      _invalid: {
        borderColor: 'red',
        _focus: {
          borderColor: 'red',
        },
      },
    },
  },

  variants: {
    primary: {
      field: {
        p: '14px',
        _hover: {
          borderColor: 'white',
          transition: '0.5s',
        },
        _focus: {
          borderColor: 'white',
        },
      },
    },
    secondary: {
      field: {
        _hover: {
          borderColor: 'white',
          transition: '0.5s',
        },
        _focus: {
          borderColor: 'primary',
        },
      },
    },
  },
});
