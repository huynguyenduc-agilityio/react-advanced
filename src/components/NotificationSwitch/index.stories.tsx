import { Meta, StoryObj } from '@storybook/react';

import NotificationSwitch from '.';
import { NotificationType } from '@/enums';

const meta = {
  title: 'Components/NotificationSwitch',
  component: NotificationSwitch,
  argTypes: {
    value: {
      control: 'radio',
      options: [NotificationType.InApp, NotificationType.Email],
    },
  },
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof NotificationSwitch>;

export default meta;

type Story = StoryObj<typeof NotificationSwitch>;

export const Default: Story = {
  args: { value: NotificationType.InApp },
};

export const EmailSelected: Story = {
  args: { value: NotificationType.Email },
};
