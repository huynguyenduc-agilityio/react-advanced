import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import TeamForm from '..';

// Mock Wrapper để tích hợp React Hook Form
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return (
    <ChakraProvider>
      <FormProvider {...methods}>{children}</FormProvider>
    </ChakraProvider>
  );
};

// Render TeamForm với Wrapper
const renderComponent = () => {
  render(
    <Wrapper>
      <TeamForm />
    </Wrapper>,
  );
};

describe('TeamForm Component', () => {
  it('renders all input fields correctly', () => {
    renderComponent();

    expect(screen.getByLabelText(/team name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rank/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/office/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mail/i)).toBeInTheDocument();
  });

  it('allows selecting an option from the Rank dropdown', async () => {
    renderComponent();

    const rankSelect = screen.getByLabelText(/rank/i);
    fireEvent.change(rankSelect, { target: { value: 'senior' } });

    await waitFor(() => {
      expect((rankSelect as HTMLSelectElement).value).toBe('senior');
    });
  });

  it('submits the form successfully with valid inputs', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/team name/i), {
      target: { value: 'Alpha Team' },
    });
    fireEvent.change(screen.getByLabelText(/office/i), {
      target: { value: 'New York' },
    });
    fireEvent.change(screen.getByLabelText(/mail/i), {
      target: { value: 'alpha@team.com' },
    });

    const rankSelect = screen.getByLabelText(/rank/i);
    fireEvent.change(rankSelect, { target: { value: 'design' } });

    await waitFor(() => {
      expect(screen.getByLabelText(/team name/i)).toHaveValue('Alpha Team');
      expect(screen.getByLabelText(/office/i)).toHaveValue('New York');
      expect(screen.getByLabelText(/mail/i)).toHaveValue('alpha@team.com');
      expect((rankSelect as HTMLSelectElement).value).toBe('design');
    });

    expect(screen.queryByText(/is required/i)).toBeNull();
  });

  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
