import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

// Layout
import MainLayout from '@/layouts/MainLayout';

describe('MainLayout', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
