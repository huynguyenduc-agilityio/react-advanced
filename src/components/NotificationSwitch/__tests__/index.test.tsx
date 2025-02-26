import { render, screen, fireEvent } from '@testing-library/react';

// Types
import { NotificationType } from '@/types';

// Components
import NotificationSwitch from '@/components/NotificationSwitch';

describe('NotificationSwitch', () => {
  const handleChange = jest.fn();

  it('renders correctly with default value', () => {
    render(
      <NotificationSwitch
        value={NotificationType.InApp}
        onChange={handleChange}
      />,
    );
    expect(screen.getByText('In-app')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('calls onChange with correct value when toggled', () => {
    render(
      <NotificationSwitch
        value={NotificationType.InApp}
        onChange={handleChange}
      />,
    );

    const emailOption = screen.getByText('Email');
    fireEvent.click(emailOption);

    expect(handleChange).toHaveBeenCalledWith(NotificationType.Email);
  });

  it('updates visual state when toggled', () => {
    render(
      <NotificationSwitch
        value={NotificationType.InApp}
        onChange={handleChange}
      />,
    );
    const emailOption = screen.getByText('Email');
    fireEvent.click(emailOption);

    expect(emailOption).toHaveStyle('color: pastelBlue');
  });

  it('should match snapshot', () => {
    const { container } = render(
      <NotificationSwitch
        value={NotificationType.InApp}
        onChange={handleChange}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
