import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@chakra-ui/react';

// Components
import BillForm from '.';

const meta = {
  title: 'Components/BillForm',
  component: BillForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <Flex justifyContent="center" w="1000px" p={9} bgColor="spaceBlue">
      <BillForm />
    </Flex>
  ),
} satisfies Meta<typeof BillForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
