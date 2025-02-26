import { fireEvent, render } from '@testing-library/react';

// Components
import TextareaField from '..';
import { HiMiniPencil } from 'react-icons/hi2';

describe('TextareaField component', () => {
  const mockOnChange = jest.fn();
  const props = {
    label: 'Description',
    name: 'description',
    icon: HiMiniPencil,
    placeholder: 'Description',
    onChange: mockOnChange,
  };
  it('should match snapshot', () => {
    const { container } = render(<TextareaField {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should call onChange when input value is changed', async () => {
    const { getByPlaceholderText } = render(<TextareaField {...props} />);
    fireEvent.change(getByPlaceholderText('Description'), {
      target: { value: 'user@gmail.com' },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should display error message when isError is true', () => {
    const { getByText } = render(
      <TextareaField {...props} isError errorMessages="Required field" />,
    );

    expect(getByText('Required field')).toBeInTheDocument();
  });
});
