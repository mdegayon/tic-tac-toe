import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReloadButton from './ReloadButton';
import * as SoundEffectService from '../../services/SoundEffectService';

// Mock the SoundEffectService
jest.mock('../../services/SoundEffectService', () => ({
  trigger: jest.fn()
}));

describe('ReloadButton', () => {
  it('should call onReloadClick and trigger sound effect when clicked', () => {
    const mockOnClick = jest.fn();
    render(<ReloadButton onReloadClick={mockOnClick} />);
    
    const button = screen.getByRole('button', { name: /reload/i });
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(SoundEffectService.trigger).toHaveBeenCalledWith('game:reload');
  });

  it('should have the correct CSS class', () => {
    render(<ReloadButton onReloadClick={() => {}} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('nes-btn');
  });
});
