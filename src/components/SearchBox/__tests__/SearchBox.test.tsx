import { fireEvent, render } from '@testing-library/react';

// Components
import SearchBox from '..';

const mockOnChange = jest.fn();

describe('SearchBox Component', () => {
  it('match SearchBox component', () => {
    const element = render(<SearchBox onChange={mockOnChange} />);

    expect(element).toMatchSnapshot();
  });

  it('should render input with placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBox onChange={mockOnChange} />,
    );

    expect(getByPlaceholderText('Search for...')).toBeInTheDocument();
  });

  it('Should call onChange function', () => {
    const { getByPlaceholderText } = render(
      <SearchBox onChange={mockOnChange} />,
    );

    const input = getByPlaceholderText('Search for...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });
});
