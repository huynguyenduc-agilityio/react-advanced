import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@chakra-ui/react';

// Components
import NotificationForm from '.';

const meta = {
  title: 'Components/NotificationForm',
  component: NotificationForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <Flex w="1000px" p={9} flexDirection="column" bgColor="spaceBlue">
      <NotificationForm />
    </Flex>
  ),
} satisfies Meta<typeof NotificationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
