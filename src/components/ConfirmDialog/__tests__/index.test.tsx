import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';

import { useConfirmationDialog } from '@/contexts';

import ConfirmDialog from '..';

// Mock the `useConfirmationDialog` context
jest.mock('@/contexts', () => ({
  useConfirmationDialog: jest.fn(),
}));

describe('ConfirmDialog', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    // Mock the context for each test
    (useConfirmationDialog as jest.Mock).mockReturnValue({
      isOpen: true,
      onClose: jest.fn(),
      confirmInfo: {
        title: 'Confirm Action',
        confirmMessage: 'Are you sure you want to proceed?',
        onConfirm: mockOnConfirm,
        onCancel: mockOnCancel,
      },
    });
  });

  it('renders the dialog with title and message', () => {
    render(
      <ChakraProvider>
        <ConfirmDialog />
      </ChakraProvider>,
    );

    // Check if title and message are rendered
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to proceed?'),
    ).toBeInTheDocument();
  });

  it('calls onConfirm when Confirm button is clicked', () => {
    render(
      <ChakraProvider>
        <ConfirmDialog />
      </ChakraProvider>,
    );

    fireEvent.click(screen.getByText('Confirm'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when Cancel button is clicked', () => {
    render(
      <ChakraProvider>
        <ConfirmDialog />
      </ChakraProvider>,
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ChakraProvider>
        <ConfirmDialog />
      </ChakraProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
