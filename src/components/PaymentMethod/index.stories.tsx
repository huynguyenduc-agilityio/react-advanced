import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

// Constants
import { PAYMENT_METHODS } from '@/constants';

import PaymentMethod, { PaymentMethodProps } from '.';

const options = PAYMENT_METHODS;

const meta: Meta<typeof PaymentMethod> = {
  title: 'Components/PaymentMethod',
  component: PaymentMethod,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PaymentMethod>;

const WithState: React.FC<PaymentMethodProps> = ({
  options,
  value: initialValue,
  ...rest
}) => {
  const [value, setValue] = useState<string>(initialValue || options[0]?.value);

  return (
    <Flex justifyContent="center" w="1000px" p={9} bgColor="midNightBlue">
      <Box w="550px">
        <PaymentMethod
          options={options}
          value={value}
          onChange={setValue}
          {...rest}
        />
      </Box>
    </Flex>
  );
};

export const Default: Story = {
  render: (args) => <WithState {...args} />,
  args: { options, value: 'visa' },
};

export const SelectMasterCard: Story = {
  render: (args) => <WithState {...args} />,
  args: { options, value: 'mastercard' },
};

export const SelectAmericanExpress: Story = {
  render: (args) => <WithState {...args} />,
  args: { options, value: 'american-express' },
};
