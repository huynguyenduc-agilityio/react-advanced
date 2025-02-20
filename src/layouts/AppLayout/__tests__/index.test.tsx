import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Layouts
import AppLayout from '@/layouts/AppLayout';

jest.mock('@/layouts/MainLayout', () => () => (
  <div data-testid="main-layout" />
));

describe('AppLayout', () => {
  beforeAll(() => {
    Object.defineProperty(document.documentElement, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    });
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
