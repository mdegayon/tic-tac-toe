import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Player from './Player';

// Mock the child components
jest.mock('../form/EditableField/EditableField', () => {
  return function MockEditableField({ value, onChange, className }) {
    return (
      <input
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="editable-field"
      />
    );
  };
});

jest.mock('../form/AvatarPicker/AvatarPicker', () => {
  return function MockAvatarPicker({ onSelect, onClose, side }) {
    return (
      <div data-testid="avatar-picker" data-side={side}>
        <button onClick={() => onSelect('nes-bulbasaur')}>Select Avatar</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

describe('Player', () => {
  const mockPlayer = {
    name: 'Player 1',
    victories: 5,
    losses: 3,
    ties: 2,
    icon: 'nes-icon is-large heart is-empty',
    avatar: 'nes-mario',
  };

  const defaultProps = {
    player: mockPlayer,
    index: 0,
    onNameChange: jest.fn(),
    onAvatarChange: jest.fn(),
    isCurrent: false,
    side: 'left',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render player information correctly', () => {
    render(<Player {...defaultProps} />);
    
    expect(screen.getByDisplayValue('Player 1')).toBeInTheDocument();
    expect(screen.getByText('W: 5')).toBeInTheDocument();
    expect(screen.getByText('L: 3')).toBeInTheDocument();
    expect(screen.getByText('T: 2')).toBeInTheDocument();
  });

  it('should apply "is-current" class when isCurrent is true', () => {
    const { container } = render(<Player {...defaultProps} isCurrent={true} />);
    
    const playerDiv = container.querySelector('.Player');
    expect(playerDiv).toHaveClass('is-current');
  });

  it('should not apply "is-current" class when isCurrent is false', () => {
    const { container } = render(<Player {...defaultProps} isCurrent={false} />);
    
    const playerDiv = container.querySelector('.Player');
    expect(playerDiv).not.toHaveClass('is-current');
  });

  it('should call onNameChange when name is edited', () => {
    render(<Player {...defaultProps} />);
    
    const nameInput = screen.getByTestId('editable-field');
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    
    expect(defaultProps.onNameChange).toHaveBeenCalledWith(0, 'New Name');
  });

  it('should show avatar picker when avatar is clicked', () => {
    const { container } = render(<Player {...defaultProps} />);
    
    const avatarDiv = container.querySelector('.player-avatar');
    fireEvent.click(avatarDiv);
    
    expect(screen.getByTestId('avatar-picker')).toBeInTheDocument();
  });

  it('should hide avatar picker when closed', () => {
    const { container } = render(<Player {...defaultProps} />);
    
    const avatarDiv = container.querySelector('.player-avatar');
    fireEvent.click(avatarDiv);
    
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    
    expect(screen.queryByTestId('avatar-picker')).not.toBeInTheDocument();
  });

  it('should call onAvatarChange when avatar is selected', () => {
    const { container } = render(<Player {...defaultProps} />);
    
    const avatarDiv = container.querySelector('.player-avatar');
    fireEvent.click(avatarDiv);
    
    const selectButton = screen.getByText('Select Avatar');
    fireEvent.click(selectButton);
    
    expect(defaultProps.onAvatarChange).toHaveBeenCalledWith(0, 'nes-bulbasaur');
  });

  it('should calculate victory bar percentages correctly', () => {
    const { container } = render(<Player {...defaultProps} />);
    
    const totalGames = 5 + 3 + 2; // 10 games
    const winPercentage = (5 / 10) * 100; // 50%
    const lossPercentage = (3 / 10) * 100; // 30%
    const tiePercentage = (2 / 10) * 100; // 20%
    
    const winsBar = container.querySelector('.victory-bar-segment.wins');
    const lossesBar = container.querySelector('.victory-bar-segment.losses');
    const tiesBar = container.querySelector('.victory-bar-segment.ties');
    
    expect(winsBar).toHaveStyle({ width: `${winPercentage}%` });
    expect(lossesBar).toHaveStyle({ width: `${lossPercentage}%` });
    expect(tiesBar).toHaveStyle({ width: `${tiePercentage}%` });
  });

  it('should handle zero games played', () => {
    const playerWithNoGames = {
      ...mockPlayer,
      victories: 0,
      losses: 0,
      ties: 0,
    };
    
    const { container } = render(<Player {...defaultProps} player={playerWithNoGames} />);
    
    const winsBar = container.querySelector('.victory-bar-segment.wins');
    const lossesBar = container.querySelector('.victory-bar-segment.losses');
    const tiesBar = container.querySelector('.victory-bar-segment.ties');
    
    expect(winsBar).toHaveStyle({ width: '0%' });
    expect(lossesBar).toHaveStyle({ width: '0%' });
    expect(tiesBar).toHaveStyle({ width: '0%' });
  });

  it('should display player avatar with correct class', () => {
    const { container } = render(<Player {...defaultProps} />);
    
    const avatarIcon = container.querySelector('.nes-mario');
    expect(avatarIcon).toBeInTheDocument();
  });

  it('should display player icon', () => {
    const { container } = render(<Player {...defaultProps} />);
    
    const playerIcon = container.querySelector('.nes-icon.is-large.heart.is-empty');
    expect(playerIcon).toBeInTheDocument();
  });

  it('should apply avatar-blink class when player is current', () => {
    const { container } = render(<Player {...defaultProps} isCurrent={true} />);
    
    const avatarIcon = container.querySelector('.avatar-blink');
    expect(avatarIcon).toBeInTheDocument();
  });

  it('should pass correct side prop to AvatarPicker', () => {
    const { container } = render(<Player {...defaultProps} side="right" />);
    
    const avatarDiv = container.querySelector('.player-avatar');
    fireEvent.click(avatarDiv);
    
    const avatarPicker = screen.getByTestId('avatar-picker');
    expect(avatarPicker).toHaveAttribute('data-side', 'right');
  });
});
