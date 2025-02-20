import type { Meta, StoryObj } from '@storybook/react';

// Components
import SearchBox from '.';

const meta = {
  title: 'Components/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: (value: string) => console.log(value),
  },
};
