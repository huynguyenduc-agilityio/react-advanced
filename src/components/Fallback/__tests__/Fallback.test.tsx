import { render } from '@testing-library/react';

// Component
import Fallback from '..';

describe('Fallback Component', () => {
  it('should render correctly', () => {
    const element = render(<Fallback />);
    expect(element).toMatchSnapshot();
  });
});
