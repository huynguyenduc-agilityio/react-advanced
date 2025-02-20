import type { Meta, StoryObj } from '@storybook/react';

// Components
import Navbar from '.';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    children: (
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
        pariatur consectetur veritatis voluptatum culpa accusamus ipsam
        doloremque eveniet, natus ea ratione. Facere, sapiente eaque! Fugiat
        quam beatae temporibus vitae incidunt!
      </p>
    ),
  },
};
