import { Meta, StoryObj } from '@storybook/react';

import PaymentMethod from '.';
import { PAYMENT_METHODS } from '@/constants';

const options = PAYMENT_METHODS;

const meta = {
  title: 'Components/PaymentMethod',
  component: PaymentMethod,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof PaymentMethod>;

export default meta;

type Story = StoryObj<typeof PaymentMethod>;

export const Default: Story = {
  args: { options, value: 'visa' },
};

export const SelectMasterCard: Story = {
  args: { options, value: 'mastercard' },
};

export const SelectAmericanExpress: Story = {
  args: { options, value: 'american-express' },
};
