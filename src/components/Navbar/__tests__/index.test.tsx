import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from '..';

describe('Navbar component', () => {
  it('should render correctly and match snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Navbar>
          <div>Test Content</div>
        </Navbar>
      </BrowserRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
