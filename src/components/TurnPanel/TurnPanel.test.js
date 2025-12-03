import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TurnPanel from './TurnPanel';

describe('TurnPanel', () => {
  it('should render the turn icon', () => {
    const turnIcon = 'nes-icon is-large heart';
    const { container } = render(<TurnPanel turnIcon={turnIcon} />);
    
    const icon = container.querySelector('.nes-icon.is-large.heart');
    expect(icon).toBeInTheDocument();
  });

  it('should display "turn" text', () => {
    render(<TurnPanel turnIcon="nes-icon is-large star" />);
    
    expect(screen.getByText('turn')).toBeInTheDocument();
  });

  it('should render with different icon classes', () => {
    const { container, rerender } = render(
      <TurnPanel turnIcon="nes-icon is-large heart is-empty" />
    );
    
    let icon = container.querySelector('i');
    expect(icon).toHaveClass('nes-icon', 'is-large', 'heart', 'is-empty');
    
    // Re-render with different icon
    rerender(<TurnPanel turnIcon="nes-icon is-large star is-empty" />);
    
    icon = container.querySelector('i');
    expect(icon).toHaveClass('nes-icon', 'is-large', 'star', 'is-empty');
  });

  it('should render icon with correct className attribute', () => {
    const turnIcon = 'custom-icon-class';
    const { container } = render(<TurnPanel turnIcon={turnIcon} />);
    
    const icon = container.querySelector('i');
    expect(icon).toHaveClass('custom-icon-class');
  });
});
