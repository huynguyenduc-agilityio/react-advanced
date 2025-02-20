import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@chakra-ui/react';

// Components
import TeamForm from '.';

const meta = {
  title: 'Components/TeamForm',
  component: TeamForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <Flex justifyContent="center" w="1000px" p={9} bg="spaceBlue">
      <TeamForm />
    </Flex>
  ),
} satisfies Meta<typeof TeamForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
