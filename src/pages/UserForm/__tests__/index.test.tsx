import { render, screen, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import UserForm from '..';

// Mocks
import { mockInitialValuesUser } from '@/__mocks__';

// Hooks
import { useCreateUser, useGetUser, useUpdateUser } from '@/hooks';
import userEvent from '@testing-library/user-event';
import { useUserForm, useUserFormActions } from '@/stores';
import { act } from 'react';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useGetUser: jest.fn(),
  useCreateUser: jest.fn(),
  useUpdateUser: jest.fn(),
}));

jest.mock('@/stores', () => ({
  ...jest.requireActual('@/stores'),
  useUserForm: jest.fn(() => ({
    user: {},
    userValidity: true,
  })),
  useUserFormActions: jest.fn(() => ({
    setUserData: jest.fn(),
    resetUserForm: jest.fn(),
    setFormValidity: jest.fn(),
  })),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('UserForm Component', () => {
  const queryClient = new QueryClient();
  const mockSetUserData = jest.fn();
  const mockResetUserForm = jest.fn();
  const mockSetFormValidity = jest.fn();

  const renderComponent = (id?: string) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <MemoryRouter
            initialEntries={[`/users/${id ? 'edit/' + id : 'add-user'}`]}
          >
            <Routes>
              <Route
                path={`/users/${id ? 'edit/:id' : 'add-user'}`}
                element={<UserForm />}
              />
            </Routes>
          </MemoryRouter>
        </ChakraProvider>
      </QueryClientProvider>,
    );
  };

  beforeEach(() => {
    (useCreateUser as jest.Mock).mockReturnValue({
      handleCreateUser: jest.fn(),
    });
    (useUpdateUser as jest.Mock).mockReturnValue({
      handleUpdateUser: jest.fn(),
    });
    (useUserForm as jest.Mock).mockReturnValue({
      user: {},
      userValidity: true,
    });

    (useUserFormActions as jest.Mock).mockReturnValue({
      setUserData: mockSetUserData,
      resetUserForm: mockResetUserForm,
      setFormValidity: mockSetFormValidity,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders update user form correctly with user data', async () => {
    (useGetUser as jest.Mock).mockReturnValue({
      user: mockInitialValuesUser,
    });
    (useUpdateUser as jest.Mock).mockReturnValue({
      handleUpdateUser: jest.fn(),
    });

    renderComponent('123');

    await waitFor(() => {
      expect(
        screen.getByText('Update User', { selector: 'p.chakra-text' }),
      ).toBeInTheDocument();
    });
  });

  it('displays all form tabs', () => {
    renderComponent();

    expect(
      screen.getByRole('tab', { name: /personal information/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /team/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /billing/i })).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: /notifications/i }),
    ).toBeInTheDocument();
  });

  it('initializes form with user data when editing', async () => {
    (useGetUser as jest.Mock).mockReturnValue({
      user: mockInitialValuesUser,
    });
    (useUpdateUser as jest.Mock).mockReturnValue({
      handleUpdateUser: jest.fn(),
    });

    renderComponent('123');

    await waitFor(() => {
      expect(useGetUser).toHaveBeenCalledWith('123');
    });
  });

  it('calls handleCreateUser when adding a new user', async () => {
    const mockHandleCreateUser = jest.fn();

    // Mock the API call to create the user
    (useCreateUser as jest.Mock).mockReturnValue({
      handleCreateUser: mockHandleCreateUser,
    });

    renderComponent();

    act(() => {
      mockSetUserData(mockInitialValuesUser);
    });

    // Navigate to the Notifications tab before searching for the button
    const notificationsTab = screen.getByRole('tab', {
      name: /notifications/i,
    });
    await userEvent.click(notificationsTab);

    const submitButton = await screen.findByRole('button', {
      name: /add user/i,
    });
    expect(submitButton).not.toBeDisabled();

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleCreateUser).toHaveBeenCalledTimes(1);
      expect(mockHandleCreateUser).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  it('calls handleUpdateUser when updating a user', async () => {
    const mockHandleUpdateUser = jest.fn();

    // Mock the API call to get user data
    (useGetUser as jest.Mock).mockReturnValue({
      user: mockInitialValuesUser,
    });

    // Mock the API call to update the user
    (useUpdateUser as jest.Mock).mockReturnValue({
      handleUpdateUser: mockHandleUpdateUser,
    });

    // Render component with user ID '123'
    renderComponent('123');

    await waitFor(() => {
      expect(useGetUser).toHaveBeenCalledWith('123');
    });

    act(() => {
      mockSetUserData(mockInitialValuesUser);
    });

    // Navigate to the Notifications tab before searching for the button
    const notificationsTab = screen.getByRole('tab', {
      name: /notifications/i,
    });
    await userEvent.click(notificationsTab);

    const submitButton = await screen.findByRole('button', {
      name: /update user/i,
    });
    expect(submitButton).not.toBeDisabled();

    await userEvent.click(submitButton);

    // Verify that handleUpdateUser was called with the expected object
    await waitFor(() => {
      expect(mockHandleUpdateUser).toHaveBeenCalledTimes(1);
      expect(mockHandleUpdateUser).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
