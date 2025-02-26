import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

// Types
import { NotificationType } from '@/types';

import NotificationSwitch from '.';

const meta: Meta<typeof NotificationSwitch> = {
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
};

export default meta;

type Story = StoryObj<typeof NotificationSwitch>;

interface WithStateProps {
  value: NotificationType;
  onChange?: (value: NotificationType) => void;
}

const WithState: React.FC<WithStateProps> = ({ value: initialValue }) => {
  const [value, setValue] = useState<NotificationType>(initialValue);

  return <NotificationSwitch value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <WithState value={args.value ?? NotificationType.InApp} />,
  args: { value: NotificationType.InApp },
};

export const EmailSelected: Story = {
  render: (args) => <WithState value={args.value ?? NotificationType.Email} />,
  args: { value: NotificationType.Email },
};
