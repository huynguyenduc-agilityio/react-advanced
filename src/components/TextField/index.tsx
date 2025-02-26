import { ChangeEvent, forwardRef, useCallback } from 'react';
import { IconType } from 'react-icons';
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputProps,
} from '@chakra-ui/react';

type TTextFieldProps = Omit<InputProps, 'onChange'> & {
  label: string;
  icon?: IconType;
  isRequired?: boolean;
  isError?: boolean;
  errorMessages?: string;
  onChange: (value: string) => void;
};

const TextField = forwardRef<HTMLInputElement, TTextFieldProps>(
  (
    {
      label,
      isRequired = false,
      isError = false,
      errorMessages = 'Default error',
      icon,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const handleChangeValue = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange],
    );

    return (
      <FormControl my={6} isRequired={isRequired} isInvalid={isError}>
        <Flex align="start">
          <Flex align="center" mt={1}>
            {icon && <Icon as={icon} color="white" boxSize={3} />}
            <FormLabel
              fontSize="sm"
              color="white"
              w="168px"
              textAlign="left"
              mb={0}
              ml={1}
            >
              {label}
            </FormLabel>
          </Flex>
          <Box flex="1">
            <Input
              ref={ref}
              variant="primary"
              onChange={handleChangeValue}
              {...rest}
              isInvalid={isError}
            />
            {isError && (
              <FormErrorMessage color="red" fontSize="xs">
                {errorMessages}
              </FormErrorMessage>
            )}
          </Box>
        </Flex>
      </FormControl>
    );
  },
);

export default TextField;
