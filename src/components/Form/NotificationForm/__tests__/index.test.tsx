import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

// Types
import { IUserModel, NotificationType } from '@/types';

// Components
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NotificationForm from '..';

interface WrapperProps {
  children: ReactNode;
  initialValues?: Partial<IUserModel>;
}

describe('NotificationForm', () => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children, initialValues = {} }: WrapperProps) => {
    const methods = useForm<IUserModel>({ defaultValues: initialValues });

    return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <MemoryRouter initialEntries={['/dashboard']}>
            <FormProvider {...methods}>{children}</FormProvider>
          </MemoryRouter>
        </ChakraProvider>
      </QueryClientProvider>
    );
  };
  test('renders General and Summary sections correctly', () => {
    render(
      <Wrapper>
        <NotificationForm />
      </Wrapper>,
    );

    expect(screen.getByText(/General notifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Summary notifications/i)).toBeInTheDocument();
  });

  test('renders all notification switches with correct labels', () => {
    render(
      <Wrapper>
        <NotificationForm />
      </Wrapper>,
    );

    expect(screen.getByText(/I’m mentioned in a message/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Someone replies to any message/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/I’m assigned a task/i)).toBeInTheDocument();
    expect(screen.getByText(/A task is overdue/i)).toBeInTheDocument();
    expect(screen.getByText(/Daily summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Weekly summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Annually summary/i)).toBeInTheDocument();
  });

  test('toggles notification switches correctly', () => {
    render(
      <Wrapper initialValues={{ mentionMessage: NotificationType.InApp }}>
        <NotificationForm />
      </Wrapper>,
    );

    const mentionSwitch = document.querySelector(
      'input[name="mentionMessage"]',
    ) as Element;

    expect(mentionSwitch).toBeInTheDocument();
    expect(mentionSwitch).not.toBeChecked();

    fireEvent.click(mentionSwitch);
    expect(mentionSwitch).toBeChecked();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Wrapper>
        <NotificationForm />
      </Wrapper>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
