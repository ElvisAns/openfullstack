import { render, screen } from '@testing-library/react';
import { describe,expect,it } from 'vitest';

import Welcome from './Welcome';

describe('Welcome', () => {
  it('renders welcome text', () => {
    render(<Welcome/>);
    const welcomeNote = screen.getByText(/Welcome to our blog/i);
    expect(welcomeNote).toBeInTheDocument();
  });
});