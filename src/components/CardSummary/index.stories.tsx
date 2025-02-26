import { Box, Flex } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

// Icons
import { HeartIcon, KebabIcon, UserGroupIcon, UserIcon } from '@/components';

// Components
import CardSummary from '.';

const meta = {
  title: 'Components/CardSummary',
  component: CardSummary,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <Flex justifyContent="center" w="1000px" p={9} bgColor="spaceBlue">
      <Box w="243px">
        <CardSummary {...args} />
      </Box>
    </Flex>
  ),
} satisfies Meta<typeof CardSummary>;

export default meta;

type Story = StoryObj<typeof CardSummary>;

export const TotalUsers: Story = {
  args: {
    title: 'Total Users',
    total: 250,
    icon: <UserGroupIcon />,
  },
};

export const NewUsers: Story = {
  args: {
    title: 'New Users',
    total: 250,
    icon: <UserIcon />,
  },
};

export const TopUsers: Story = {
  args: {
    title: 'Top Users',
    total: 250,
    icon: <HeartIcon />,
  },
};

export const OtherUsers: Story = {
  args: {
    title: 'Other Users',
    total: 250,
    icon: <KebabIcon />,
  },
};
