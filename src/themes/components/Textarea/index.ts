import { defineStyleConfig } from '@chakra-ui/react';

export const Textarea = defineStyleConfig({
  baseStyle: {
    fontSize: 'xs',
    color: 'white',
    border: '0.6px solid',
    borderRadius: '4px',
    borderColor: 'slateBlue',
    backgroundColor: 'midNightBlue',
    maxHeight: '200px',
    field: {
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
    _hover: {
      borderColor: 'white',
      transition: '0.5s',
    },
    _focus: {
      borderColor: 'white',
    },
  },
});
