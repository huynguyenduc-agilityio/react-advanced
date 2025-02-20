import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ChakraProvider } from '@chakra-ui/react';

// Types
import { IUserModel } from '@/types';

// Mocks
import { mockInitialValuesUser } from '@/__mocks__';

// Components
import PersonalForm, { IPersonalForm } from '..';

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm<IUserModel>({ defaultValues: mockInitialValuesUser });
  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>{children}</FormProvider>
    </QueryClientProvider>
  );
};

const renderComponent = (props?: Partial<IPersonalForm>) => {
  return render(
    <ChakraProvider>
      <Wrapper>
        <PersonalForm {...props} />
      </Wrapper>
    </ChakraProvider>,
  );
};

describe('PersonalForm Component', () => {
  it('renders form with initial values', () => {
    renderComponent({ initialValues: mockInitialValuesUser });

    expect(screen.getByLabelText('Full name')).toHaveValue('John Doe');
    expect(screen.getByLabelText('Email address')).toHaveValue(
      'john.doe@example.com',
    );
    expect(screen.getByLabelText('Phone')).toHaveValue('123456789');
    expect(screen.getByLabelText('Position')).toHaveValue('Software Engineer');
    expect(screen.getByLabelText('Location')).toHaveValue('New York');
    expect(screen.getByLabelText('Website')).toHaveValue('https://johndoe.com');
    expect(screen.getByLabelText('Company')).toHaveValue('Tech Corp');
    expect(screen.getByLabelText('Description')).toHaveValue(
      'Passionate about coding.',
    );
  });

  it('updates input fields correctly', async () => {
    renderComponent();

    const nameInput = screen.getByLabelText('Full name');
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

    await waitFor(() => {
      expect(nameInput).toHaveValue('Jane Doe');
    });

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });

    await waitFor(() => {
      expect(emailInput).toHaveValue('jane.doe@example.com');
    });

    const phoneInput = screen.getByLabelText('Phone');
    fireEvent.change(phoneInput, { target: { value: '987654321' } });

    await waitFor(() => {
      expect(phoneInput).toHaveValue('987654321');
    });

    const locationInput = screen.getByLabelText('Location');
    fireEvent.change(locationInput, { target: { value: 'San Francisco' } });

    await waitFor(() => {
      expect(locationInput).toHaveValue('San Francisco');
    });
  });
});
