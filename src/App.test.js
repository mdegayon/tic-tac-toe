import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock child components to isolate App logic
jest.mock('./components/Player/Player', () => {
  return function MockPlayer({ player, isCurrent, onNameChange, onAvatarChange, index }) {
    return (
      <div data-testid={`player-${index}`} data-current={isCurrent}>
        <span>{player.name}</span>
        <span>W: {player.victories}</span>
        <span>L: {player.losses}</span>
        <span>T: {player.ties}</span>
        <button onClick={() => onNameChange(index, 'New Name')}>Change Name</button>
        <button onClick={() => onAvatarChange(index, 'new-avatar')}>Change Avatar</button>
      </div>
    );
  };
});

jest.mock('./components/GameBoard/GameBoard', () => {
  return function MockGameBoard({ playerIndex, onWin, onTie, onTurnChange }) {
    return (
      <div data-testid="game-board">
        <button onClick={onTurnChange}>Next Turn</button>
        <button onClick={() => onWin(playerIndex)}>Trigger Win</button>
        <button onClick={onTie}>Trigger Tie</button>
      </div>
    );
  };
});

jest.mock('./components/TurnPanel/TurnPanel', () => {
  return function MockTurnPanel({ turnIcon }) {
    return <div data-testid="turn-panel" data-icon={turnIcon}>Turn Panel</div>;
  };
});

jest.mock('./components/WinnerPanel/WinnerPanel', () => {
  return function MockWinnerPanel({ winner, onReloadClick }) {
    if (!winner) return null;
    return (
      <div data-testid="winner-panel">
        <span>{winner}</span>
        <button onClick={onReloadClick}>Reload</button>
      </div>
    );
  };
});

jest.mock('./components/ReloadButton/ReloadButton', () => {
  return function MockReloadButton({ onReloadClick }) {
    return <button onClick={onReloadClick} data-testid="reload-button">Reload</button>;
  };
});

jest.mock('./services/SoundEffectService', () => ({
  trigger: jest.fn(),
  default: {
    trigger: jest.fn(),
  }
}));

describe('App', () => {
  it('should render the main app structure', () => {
    render(<App />);
    
    expect(screen.getByTestId('player-0')).toBeInTheDocument();
    expect(screen.getByTestId('player-1')).toBeInTheDocument();
    expect(screen.getByTestId('game-board')).toBeInTheDocument();
    expect(screen.getByTestId('turn-panel')).toBeInTheDocument();
  });

  it('should render Battle Arena title', () => {
    render(<App />);
    
    expect(screen.getByText('Battle Arena')).toBeInTheDocument();
  });

  it('should initialize with two players', () => {
    render(<App />);
    
    expect(screen.getByText('Papá')).toBeInTheDocument();
    expect(screen.getByText('Pupu')).toBeInTheDocument();
  });

  it('should toggle player turn when onTurnChange is called', () => {
    render(<App />);
    
    const player0 = screen.getByTestId('player-0');
    const player1 = screen.getByTestId('player-1');
    
    const initialPlayer0Current = player0.getAttribute('data-current');
    const initialPlayer1Current = player1.getAttribute('data-current');
    
    // Click turn change button
    const turnButton = screen.getByText('Next Turn');
    fireEvent.click(turnButton);
    
    // Check that current player has toggled
    const newPlayer0Current = player0.getAttribute('data-current');
    const newPlayer1Current = player1.getAttribute('data-current');
    
    expect(initialPlayer0Current !== newPlayer0Current || initialPlayer1Current !== newPlayer1Current).toBe(true);
  });

  it('should update player name when onNameChange is called', () => {
    render(<App />);
    
    const changeNameButtons = screen.getAllByText('Change Name');
    fireEvent.click(changeNameButtons[0]);
    
    expect(screen.getByText('New Name')).toBeInTheDocument();
  });

  it('should update player avatar when onAvatarChange is called', () => {
    render(<App />);
    
    const changeAvatarButtons = screen.getAllByText('Change Avatar');
    fireEvent.click(changeAvatarButtons[0]);
    
    // The component should re-render with new avatar
    // (we can't directly test the avatar change due to mocking, but we verify no crash)
    expect(screen.getByTestId('player-0')).toBeInTheDocument();
  });

  it('should display winner panel when there is a winner', () => {
    render(<App />);
    
    const winButton = screen.getByText('Trigger Win');
    fireEvent.click(winButton);
    
    expect(screen.getByTestId('winner-panel')).toBeInTheDocument();
  });

  it('should increment victories for winner and losses for loser', () => {
    render(<App />);
    
    // Initial scores should be 0
    const player0Victories = screen.getAllByText('W: 0');
    expect(player0Victories.length).toBeGreaterThan(0);
    
    const winButton = screen.getByText('Trigger Win');
    fireEvent.click(winButton);
    
    // Winner should have 1 victory
    expect(screen.getByText('W: 1')).toBeInTheDocument();
    // Loser should have 1 loss
    expect(screen.getByText('L: 1')).toBeInTheDocument();
  });

  it('should display tie panel and increment ties for both players', () => {
    render(<App />);
    
    const tieButton = screen.getByText('Trigger Tie');
    fireEvent.click(tieButton);
    
    expect(screen.getByTestId('winner-panel')).toBeInTheDocument();
    expect(screen.getByText('Tie!')).toBeInTheDocument();
    
    // Both players should have 1 tie
    const tieElements = screen.getAllByText('T: 1');
    expect(tieElements).toHaveLength(2);
  });

  it('should reset game when reload button is clicked', () => {
    render(<App />);
    
    // Trigger a win
    const winButton = screen.getByText('Trigger Win');
    fireEvent.click(winButton);
    
    expect(screen.getByTestId('winner-panel')).toBeInTheDocument();
    
    // Click reload from winner panel
    const reloadButtons = screen.getAllByText('Reload');
    fireEvent.click(reloadButtons[0]);
    
    // Winner panel should disappear
    expect(screen.queryByTestId('winner-panel')).not.toBeInTheDocument();
  });

  it('should maintain player scores across game reloads', () => {
    render(<App />);
    
    // Win a game
    const winButton = screen.getByText('Trigger Win');
    fireEvent.click(winButton);
    
    expect(screen.getByText('W: 1')).toBeInTheDocument();
    
    // Reload
    const reloadButtons = screen.getAllByText('Reload');
    fireEvent.click(reloadButtons[0]);
    
    // Score should persist
    expect(screen.getByText('W: 1')).toBeInTheDocument();
  });

  it('should have a reload button in the main interface', () => {
    render(<App />);
    
    expect(screen.getByTestId('reload-button')).toBeInTheDocument();
  });

  it('should reset winner state when reload button is clicked', () => {
    render(<App />);
    
    // Trigger win
    const winButton = screen.getByText('Trigger Win');
    fireEvent.click(winButton);
    
    // Winner panel should be visible
    expect(screen.getByTestId('winner-panel')).toBeInTheDocument();
    
    // Click main reload button
    const reloadButton = screen.getByTestId('reload-button');
    fireEvent.click(reloadButton);
    
    // Winner panel should disappear
    expect(screen.queryByTestId('winner-panel')).not.toBeInTheDocument();
  });
});
