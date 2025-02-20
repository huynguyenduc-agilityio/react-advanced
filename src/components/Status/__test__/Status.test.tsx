import { render, screen } from '@testing-library/react';

// Enums
import { Status as StatusEnum } from '@/enums';

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
});
