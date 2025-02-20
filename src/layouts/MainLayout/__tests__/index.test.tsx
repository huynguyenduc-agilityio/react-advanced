import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

// Layout
import MainLayout from '@/layouts/MainLayout';

describe('MainLayout', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
