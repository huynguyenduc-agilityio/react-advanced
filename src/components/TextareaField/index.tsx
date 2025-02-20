import { ChangeEvent, memo } from 'react';
import {
  FormLabel,
  FormErrorMessage,
  FormControl,
  Textarea,
  TextareaProps,
  Flex,
  Box,
  Icon,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

type TTextareaFieldProps = Omit<TextareaProps, 'onChange'> & {
  label: string;
  errorMessages?: string;
  isError?: boolean;
  icon: IconType;
  onChange: (value: string) => void;
};

const TextareaField = ({
  isError = false,
  errorMessages = 'Default error',
  label,
  icon,
  onChange,
  ...rest
}: TTextareaFieldProps) => {
  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>): void =>
    onChange(e.target.value);

  return (
    <FormControl my={6} isInvalid={isError}>
      <Flex align="start">
        <Flex align="center" mt={1}>
          <Icon as={icon} color="white" boxSize={3} mr={1} />
          <FormLabel
            fontSize="sm"
            color="white"
            w="168px"
            textAlign="left"
            mb={0}
          >
            {label}
          </FormLabel>
        </Flex>
        <Box flex="1">
          <Textarea
            variant="primary"
            onChange={handleChangeValue}
            {...rest}
            isInvalid={isError}
          />
          {isError && (
            <FormErrorMessage color="red" fontSize="2xs">
              {errorMessages}
            </FormErrorMessage>
          )}
        </Box>
      </Flex>
    </FormControl>
  );
};

export default memo(TextareaField);
