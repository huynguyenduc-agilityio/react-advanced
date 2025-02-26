import { fireEvent, render } from '@testing-library/react';

import { PAYMENT_METHODS } from '@/constants';
import PaymentMethod from '..';

describe('PaymentMethod Component', () => {
  it('renders all payment options', () => {
    const { getByText } = render(
      <PaymentMethod options={PAYMENT_METHODS} value="credit" />,
    );

    expect(getByText('VISA **** 8092')).toBeInTheDocument();
    expect(getByText('Mastercard **** 8092')).toBeInTheDocument();
    expect(getByText('American Express **** 8092')).toBeInTheDocument();
  });

  it('allows selecting a different payment method', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <PaymentMethod
        options={PAYMENT_METHODS}
        value="credit"
        onChange={handleChange}
      />,
    );

    fireEvent.click(getByText('Mastercard **** 8092'));
    expect(handleChange).toHaveBeenCalledWith('mastercard');
  });

  it('calls onChange when selecting a payment option', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <PaymentMethod
        options={PAYMENT_METHODS}
        value="credit"
        onChange={handleChange}
      />,
    );

    fireEvent.click(getByRole('radio', { name: /Mastercard/i }));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    const { container } = render(
      <PaymentMethod options={PAYMENT_METHODS} value="credit" />,
    );

    expect(container).toMatchSnapshot();
  });
});
