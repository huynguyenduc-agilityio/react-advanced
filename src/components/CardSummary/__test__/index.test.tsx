import { render } from '@testing-library/react';

// Components
import CardSummary from '..';

describe('CardSummary component', () => {
  it('renders the Button with children', () => {
    const { getByText } = render(
      <CardSummary title="Top Users" total={250} icon={<span>icon</span>} />,
    );
    expect(getByText('Top Users')).toBeInTheDocument();
    expect(getByText('250')).toBeInTheDocument();
    expect(getByText('icon')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <CardSummary title="Top Users" total={250} icon={<span>icon</span>} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
