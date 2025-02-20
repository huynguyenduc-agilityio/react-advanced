import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'normal',
    borderRadius: 'base',
    fontSize: 'xs',
    _hover: {
      color: 'white',
    },
  },
  sizes: {
    md: {
      fontSize: 'xs',
    },
  },

  variants: {
    primary: {
      py: 4,
      bg: 'primary',
      color: 'white',
      _hover: {
        opacity: 0.8,
        transition: '0.5s',
        _disabled: { bg: 'primary', opacity: 0.4 },
      },
    },
    outline: {
      color: 'pastelBlue',
      borderColor: 'pastelBlue',
      _hover: {
        bg: 'gray.500',
        opacity: 0.8,
        transition: '0.5s',
      },
    },

    icon: {
      minWidth: 'fit-content',
      height: 'fit-content',
      fontSize: 'sm',
    },
  },

  defaultProps: {
    variant: 'primary',
    size: 'md',
  },
});
