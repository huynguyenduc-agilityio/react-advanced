import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Constant
import { PUBLIC_ROUTERS } from '@/constants';

// Pages
import NotFound from '..';

describe('NotFound Page', () => {
  test('should match snapshot', () => {
    const view = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    expect(view).toMatchSnapshot();
  });

  test('renders NotFound component correctly', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(getByText(/Oops! Page not found/i)).toBeInTheDocument();
    expect(
      getByText(
        /The page you are looking for might have been removed or temporarily unavailable/i,
      ),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: /Back to Dashboard/i }),
    ).toBeInTheDocument();
  });

  test('redirects to dashboard on button click', async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFound />
      </MemoryRouter>,
    );

    const button = getByRole('link', { name: /Back to Dashboard/i });
    expect(button).toBeInTheDocument();

    // Simulate a click on the button
    await userEvent.click(button);

    // Verify the button's href attribute
    expect(button).toHaveAttribute('href', PUBLIC_ROUTERS.ROOT);
  });
});
