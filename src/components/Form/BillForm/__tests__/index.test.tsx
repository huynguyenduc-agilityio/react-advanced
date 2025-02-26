import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

// Components
import BillForm from '..';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return (
    <ChakraProvider>
      <FormProvider {...methods}>{children}</FormProvider>
    </ChakraProvider>
  );
};

const renderComponent = () => {
  render(
    <Wrapper>
      <BillForm />
    </Wrapper>,
  );
};

describe('BillForm Component', () => {
  it('renders all input fields correctly', () => {
    renderComponent();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
  });

  it('allows selecting a payment method', async () => {
    renderComponent();

    const paymentOptions = screen.getAllByRole('radio');
    expect(paymentOptions.length).toBeGreaterThan(0);

    fireEvent.click(paymentOptions[1]);

    await waitFor(() => {
      expect(paymentOptions[1]).toBeChecked();
    });
  });

  it('submits the form successfully with valid inputs', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/address/i), {
      target: { value: '123 Main St' },
    });
    fireEvent.change(screen.getByLabelText(/state/i), {
      target: { value: 'California' },
    });
    fireEvent.change(screen.getByLabelText(/zip code/i), {
      target: { value: '90001' },
    });

    const paymentOptions = screen.getAllByRole('radio');
    fireEvent.click(paymentOptions[1]);

    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toHaveValue('John Doe');
      expect(screen.getByLabelText(/address/i)).toHaveValue('123 Main St');
      expect(screen.getByLabelText(/state/i)).toHaveValue('California');
      expect(screen.getByLabelText(/zip code/i)).toHaveValue('90001');
      expect(paymentOptions[1]).toBeChecked();
    });

    expect(screen.queryByText(/is required/i)).toBeNull();
  });

  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
