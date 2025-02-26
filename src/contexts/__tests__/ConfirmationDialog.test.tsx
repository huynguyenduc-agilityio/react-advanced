import { act } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ConfirmationDialogProvider, useConfirmationDialog } from '..';

const mockTitle = 'Delete Item';
const mockMessage = 'Are you sure you want to delete this item?';

const TestingComponent = () => {
  const { confirm, isOpen, confirmInfo } = useConfirmationDialog();

  const handleClick = () => {
    confirm({
      title: mockTitle,
      confirmMessage: mockMessage,
      onCancel: () => {},
      onConfirm: () => {},
    });
  };

  return (
    <>
      <p data-testid="title">Title: {confirmInfo.title}</p>
      <p data-testid="message">Message: {confirmInfo.confirmMessage}</p>
      {isOpen ? <p>Open</p> : <p>Close</p>}
      <button onClick={handleClick}>Confirm</button>
      <button onClick={confirmInfo.onCancel}>Cancel</button>
      <button onClick={confirmInfo.onConfirm}>Confirm Again</button>
    </>
  );
};

describe('ConfirmationDialogProvider', () => {
  it('should render children correctly and interact with context values', async () => {
    render(
      <ConfirmationDialogProvider>
        <TestingComponent />
      </ConfirmationDialogProvider>,
    );

    // Verify initial context default values
    expect(screen.getByText('Close')).toBeInTheDocument();

    const button = screen.getByText('Confirm');
    const buttonCancel = screen.getByText('Cancel');
    const buttonConfirm = screen.getByText('Confirm Again');

    act(() => {
      fireEvent.click(button);
      fireEvent.click(buttonCancel);
      fireEvent.click(buttonConfirm);
    });

    const textClose = screen.getByText('Open');
    const title = screen.getByTestId('title');
    const message = screen.getByTestId('message');

    await waitFor(() => {
      expect(textClose).toBeInTheDocument();
    });

    expect(title).toHaveTextContent(`Title: ${mockTitle}`);
    expect(message).toHaveTextContent(`Message: ${mockMessage}`);
  });
});
