import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';

// Hooks
import { useGetUsers } from '@/hooks';

// Mocks
import { mockUsers } from '@/__mocks__';

// Pages
import Dashboard from '..';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({ pathname: '/dashboard' }),
  useSearchParams: jest.fn(() => [new URLSearchParams(), jest.fn()]),
}));

jest.mock('@/hooks', () => ({
  useGetUsers: jest.fn(),
  useDeleteUser: jest.fn(() => ({
    handleDeleteUser: jest.fn(),
    isDeleteLoading: false,
  })),
  useDeleteMultipleUsers: jest.fn(() => ({
    handleDeleteMultipleUsers: jest.fn(),
    isDeleteMultipleLoading: false,
  })),
  usePagination: jest.fn(() => ({
    isDisableNext: false,
    isDisablePrev: false,
    handleChangeLimit: jest.fn(),
    handleChangePage: jest.fn(),
  })),
  useCustomToast: jest.fn(() => jest.fn()),
}));

describe('Dashboard Component', () => {
  const queryClient = new QueryClient();
  let mockSetSearchParams: jest.Mock;

  beforeEach(() => {
    mockSetSearchParams = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);

    (useGetUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      isUsersLoading: false,
    });
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Dashboard />
          </MemoryRouter>
        </ChakraProvider>
      </QueryClientProvider>,
    );

  it('should match snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('renders Dashboard correctly', () => {
    renderComponent();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('navigates to add user page', () => {
    renderComponent();
    const addUserButton = screen.getByText('Add User');
    expect(addUserButton.closest('a')).toHaveAttribute(
      'href',
      '/users/add-user',
    );
  });
});
