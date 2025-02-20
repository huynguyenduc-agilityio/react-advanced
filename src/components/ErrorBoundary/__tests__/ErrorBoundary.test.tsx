import { render, screen } from '@testing-library/react';

// Components
import ErrorBoundary from '..';

describe('ErrorBoundary', () => {
  const ProblemChild = () => {
    throw new Error().message;
  };

  it('renders children without error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('catches an error and displays the error message', () => {
    const { getByTitle } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );
    const button = getByTitle('Try Again');
    button.click();

    expect(
      screen.getByText('An error has been occurred!!'),
    ).toBeInTheDocument();
  });
});
