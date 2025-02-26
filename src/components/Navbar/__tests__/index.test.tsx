import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import Navbar from '..';

const setup = () => {
  render(
    <BrowserRouter>
      <Navbar>
        <div>Test Content</div>
      </Navbar>
    </BrowserRouter>,
  );
};

describe('Navbar component', () => {
  it('should match snapshot', () => {
    const container = setup();

    expect(container).toMatchSnapshot();
  });

  describe('Navbar toggle functionality', () => {
    beforeEach(() => setup());

    it('should toggle the navbar when clicking the toggle button', async () => {
      const user = userEvent.setup();

      expect(screen.getByTestId('toggle-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('toggle-logo')).not.toBeInTheDocument();

      await user.click(screen.getByTestId('toggle-icon'));

      await waitFor(() => {
        expect(screen.getByTestId('toggle-logo')).toBeInTheDocument();
        expect(screen.queryByTestId('toggle-icon')).not.toBeInTheDocument();
      });

      await user.click(screen.getByTestId('toggle-logo'));

      await waitFor(() => {
        expect(screen.getByTestId('toggle-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('toggle-logo')).not.toBeInTheDocument();
      });
    });

    it('should display correct elements based on navbar state', async () => {
      const user = userEvent.setup();

      const navbar = screen.getByRole('navigation');
      expect(within(navbar).getByText(/Get template/i)).toBeInTheDocument();
      expect(within(navbar).getByText(/John Carter/i)).toBeInTheDocument();

      await user.click(screen.getByTestId('toggle-icon'));

      await waitFor(() => {
        expect(screen.queryByText(/Get template/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/John Carter/i)).not.toBeInTheDocument();
      });

      await user.click(screen.getByTestId('toggle-logo'));

      await waitFor(() => {
        expect(screen.getByText(/Get template/i)).toBeInTheDocument();
        expect(screen.getByText(/John Carter/i)).toBeInTheDocument();
      });
    });
  });
});
