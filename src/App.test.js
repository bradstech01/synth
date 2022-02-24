import { render, screen } from '@testing-library/react';
import Nth from './Nth';

test('renders learn react link', () => {
  render(<Nth />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
