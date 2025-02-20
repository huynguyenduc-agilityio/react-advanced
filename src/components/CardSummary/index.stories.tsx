import type { Meta, StoryObj } from '@storybook/react';

// Components
import CardSummary from '.';

// Icons
import { HeartIcon, KebabIcon, UserGroupIcon, UserIcon } from '@/icons';

const meta = {
  title: 'Components/CardSummary',
  component: CardSummary,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
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
