import type { Meta, StoryObj } from '@storybook/react';

// Enums
import { Status as StatusEnum } from '@/enums';

// Components
import Status from '.';

const meta = {
  title: 'Components/Status',
  component: Status,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = {
  args: {
    type: StatusEnum.Online,
  },
};

export const Offline: Story = {
  args: {
    type: StatusEnum.Offline,
  },
};
