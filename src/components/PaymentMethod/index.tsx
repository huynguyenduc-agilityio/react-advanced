import { ElementType, forwardRef } from 'react';
import {
  Flex,
  Icon,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Box,
} from '@chakra-ui/react';

export interface Option {
  title: string;
  content: string;
  value: string;
  icon: ElementType;
}

export interface PaymentMethodProps {
  options: Option[];
  value?: string;
  name?: string;
  onChange?: (value: string) => void;
}

const PaymentMethod = forwardRef<HTMLInputElement, PaymentMethodProps>(
  ({ options, value = options[0]?.value, onChange, name, ...rest }, ref) => {
    return (
      <RadioGroup
        w="full"
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      >
        <Stack>
          {options.map(({ title, content, icon, value: optionValue }) => (
            <Box
              key={optionValue}
              borderRadius="lg"
              bgColor={value === optionValue ? '#1A2561' : 'midNightBlue'}
              border="0.6px solid"
              borderColor={value === optionValue ? '#4b52DF' : 'slateBlue'}
            >
              <Radio ref={ref} value={optionValue} p={4} w="full">
                <Flex align="center" gap={2}>
                  <Icon as={icon} />
                  <Flex direction="column">
                    <Text fontSize="xs" color="white">
                      {title}
                    </Text>
                    <Text fontSize="xs" color="pastelBlue">
                      {content}
                    </Text>
                  </Flex>
                </Flex>
              </Radio>
            </Box>
          ))}
        </Stack>
      </RadioGroup>
    );
  },
);

export default PaymentMethod;
