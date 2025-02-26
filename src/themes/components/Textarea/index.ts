import { defineStyleConfig } from '@chakra-ui/react';

export const Textarea = defineStyleConfig({
  baseStyle: {
    fontSize: 'sm',
    color: 'white',
    lineHeight: '14px',
    p: '16px',
    border: '0.6px solid',
    borderRadius: '4px',
    borderColor: 'slateBlue',
    backgroundColor: 'midNightBlue',
    minH: '90px',
    maxH: '200px',
    _placeholder: {
      color: 'pastelBlue',
    },
    _invalid: {
      borderColor: 'red',
      _focus: {
        borderColor: 'red',
      },
    },
    _hover: {
      borderColor: 'white',
      transition: '0.5s',
    },
    _focus: {
      borderColor: 'white',
    },
  },
});
