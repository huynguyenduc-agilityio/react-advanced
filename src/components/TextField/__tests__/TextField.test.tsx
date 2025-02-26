import { render, screen, fireEvent } from '@testing-library/react';
import { FaUser } from 'react-icons/fa';

import TextField from '..';

describe('TextField Component', () => {
  const mockOnChange = jest.fn();

  const commonProps = {
    label: 'Username',
    onChange: mockOnChange,
    placeholder: 'Enter your username',
  };

  it('renders the component with label and input field', () => {
    render(<TextField {...commonProps} />);

    // Check if the label and input are rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your username/i),
    ).toBeInTheDocument();
  });

  it('renders with an icon if provided', () => {
    render(<TextField {...commonProps} icon={FaUser} />);

    const icon = document.querySelector('.chakra-icon');

    // Check if the icon is rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(icon).toHaveClass('chakra-icon');
  });

  it('calls onChange when input value changes', () => {
    render(<TextField {...commonProps} />);

    const input = screen.getByLabelText(/username/i);
    fireEvent.change(input, { target: { value: 'new value' } });

    // Verify onChange is called with the new value
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('new value');
  });

  it('shows error message when isError is true', () => {
    render(
      <TextField
        {...commonProps}
        isError={true}
        errorMessages="Invalid input"
      />,
    );

    // Check if the error message is displayed
    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid input/i)).toHaveStyle({ color: 'red' });
  });

  it('does not show error message when isError is false', () => {
    render(
      <TextField
        {...commonProps}
        isError={false}
        errorMessages="Invalid input"
      />,
    );

    // Ensure no error message is displayed
    expect(screen.queryByText(/invalid input/i)).not.toBeInTheDocument();
  });

  it('should match the snapshot without icon and error', () => {
    const { asFragment } = render(<TextField {...commonProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should match the snapshot with an icon', () => {
    const { asFragment } = render(<TextField {...commonProps} icon={FaUser} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
