import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@chakra-ui/react';

// Contexts
import { ConfirmationDialogProvider, useConfirmationDialog } from '@/contexts';

import ConfirmDialog from '.';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ConfirmationDialogProvider>
        <Story />
      </ConfirmationDialogProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ConfirmDialog>;

const Template = () => {
  const { confirm } = useConfirmationDialog();

  const handleConfirmDialog = () =>
    confirm({
      title: 'Delete Item',
      confirmMessage: 'Are you sure you want to delete this item?',
      onConfirm: () => alert('Confirmed!'),
      onCancel: () => alert('Cancelled!'),
    });

  return (
    <>
      <Button onClick={handleConfirmDialog}>Delete Item</Button>
      <ConfirmDialog />
    </>
  );
};

export const Default: Story = {
  render: Template,
};
