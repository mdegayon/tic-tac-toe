import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WinnerPanel from './WinnerPanel';

describe('WinnerPanel', () => {
  it('should not render when there is no winner', () => {
    const { container } = render(<WinnerPanel winner={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('should display the winner name when there is a winner', () => {
    const winner = 'Player 1';
    const { container } = render(<WinnerPanel winner={winner} />);
    
    expect(screen.getByText(`¡${winner} won!`)).toBeInTheDocument();
    const trophyIcon = container.querySelector('.nes-icon.trophy.is-large');
    expect(trophyIcon).toBeInTheDocument();
  });
});
