import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Pages
import InternalServerError from '..';

describe('InternalServerError Page', () => {
  test('should render correctly', () => {
    const view = render(
      <BrowserRouter>
        <InternalServerError />
      </BrowserRouter>,
    );

    expect(view).toMatchSnapshot();
  });
});
