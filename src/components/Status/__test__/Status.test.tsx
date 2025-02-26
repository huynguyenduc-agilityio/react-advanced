import { render, screen } from '@testing-library/react';

// Types
import { Status as StatusEnum } from '@/types';

// Component
import Status from '@/components/Status';

describe('Status Component', () => {
  it('renders with default status (Online)', () => {
    render(<Status />);

    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('renders with Offline status', () => {
    render(<Status type={StatusEnum.Offline} />);

    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Status />);

    expect(container).toMatchSnapshot();
  });
});
