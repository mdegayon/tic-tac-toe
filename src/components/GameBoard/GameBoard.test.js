import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameBoard from './GameBoard';
import * as gameLogic from '../../utils/gameLogic';
import * as SoundEffectService from '../../services/SoundEffectService';

// Mock the dependencies
jest.mock('../../utils/gameLogic');
jest.mock('../../services/SoundEffectService', () => ({
  trigger: jest.fn(),
  default: {
    trigger: jest.fn(),
  }
}));

jest.mock('../TableCell/TableCell', () => {
  return function MockTableCell({ playerIcon, onClickChange, isWinningRow }) {
    return (
      <td 
        onClick={onClickChange} 
        data-testid="table-cell"
        data-icon={playerIcon}
        data-winning={isWinningRow}
      >
        {playerIcon}
      </td>
    );
  };
});

describe('GameBoard', () => {
  const mockCurrentPlayer = {
    name: 'Player 1',
    icon: 'nes-icon is-large heart',
    avatar: 'nes-mario',
  };

  const defaultProps = {
    playerIndex: 0,
    currentPlayer: mockCurrentPlayer,
    onWin: jest.fn(),
    onTie: jest.fn(),
    onTurnChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    gameLogic.checkWinner.mockReturnValue(null);
  });

  it('should render a 3x3 grid', () => {
    render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    expect(cells).toHaveLength(9);
  });

  it('should handle cell click and update board', () => {
    render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    fireEvent.click(cells[0]);
    
    expect(SoundEffectService.default.trigger).toHaveBeenCalledWith('cell:click');
    expect(defaultProps.onTurnChange).toHaveBeenCalled();
  });

  it('should prevent clicking on already filled cell', () => {
    render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    
    // First click should work
    fireEvent.click(cells[0]);
    expect(defaultProps.onTurnChange).toHaveBeenCalledTimes(1);
    
    // Second click on same cell should not work
    fireEvent.click(cells[0]);
    expect(SoundEffectService.default.trigger).toHaveBeenCalledWith('cell:click-err');
    expect(defaultProps.onTurnChange).toHaveBeenCalledTimes(1); // Still 1
  });

  it('should detect winner and call onWin', () => {
    const winningCells = [[0, 0], [0, 1], [0, 2]];
    gameLogic.checkWinner.mockReturnValue(winningCells);
    
    render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    fireEvent.click(cells[0]);
    
    expect(defaultProps.onWin).toHaveBeenCalledWith(0);
    expect(defaultProps.onTurnChange).not.toHaveBeenCalled();
  });

  it('should prevent further clicks after winning', () => {
    const winningCells = [[0, 0], [0, 1], [0, 2]];
    gameLogic.checkWinner.mockReturnValue(winningCells);
    
    render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    
    // First click triggers win
    fireEvent.click(cells[0]);
    expect(defaultProps.onWin).toHaveBeenCalledTimes(1);
    
    // Try clicking another cell
    jest.clearAllMocks();
    fireEvent.click(cells[1]);
    
    expect(SoundEffectService.default.trigger).toHaveBeenCalledWith('cell:click-err');
    expect(defaultProps.onWin).not.toHaveBeenCalled();
    expect(defaultProps.onTurnChange).not.toHaveBeenCalled();
  });

  it('should detect tie when board is full', () => {
    render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    
    // Fill all cells (9 clicks)
    cells.forEach((cell) => {
      fireEvent.click(cell);
    });
    
    expect(defaultProps.onTie).toHaveBeenCalled();
  });

  it('should not call onTie if board is full but there is a winner', () => {
    const winningCells = [[0, 0], [0, 1], [0, 2]];
    
    render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    
    // Fill first 8 cells
    for (let i = 0; i < 8; i++) {
      gameLogic.checkWinner.mockReturnValue(null);
      fireEvent.click(cells[i]);
    }
    
    // Last click triggers win
    gameLogic.checkWinner.mockReturnValue(winningCells);
    fireEvent.click(cells[8]);
    
    expect(defaultProps.onWin).toHaveBeenCalled();
    expect(defaultProps.onTie).not.toHaveBeenCalled();
  });

  it('should mark winning cells correctly', () => {
    const winningCells = [[0, 0], [0, 1], [0, 2]];
    gameLogic.checkWinner.mockReturnValue(winningCells);
    
    const { container } = render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    fireEvent.click(cells[0]);
    
    // After re-render, check for winning cells
    const updatedCells = screen.getAllByTestId('table-cell');
    const winningCellElements = updatedCells.filter(
      cell => cell.getAttribute('data-winning') === 'true'
    );
    
    expect(winningCellElements.length).toBeGreaterThan(0);
  });

  it('should place correct player icon on cell click', () => {
    render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    fireEvent.click(cells[4]); // Click center cell
    
    // Check that the cell now has the player's icon
    expect(cells[4].textContent).toBe(mockCurrentPlayer.icon);
  });

  it('should call onTurnChange after each valid move', () => {
    render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    
    fireEvent.click(cells[0]);
    expect(defaultProps.onTurnChange).toHaveBeenCalledTimes(1);
    
    fireEvent.click(cells[1]);
    expect(defaultProps.onTurnChange).toHaveBeenCalledTimes(2);
    
    fireEvent.click(cells[2]);
    expect(defaultProps.onTurnChange).toHaveBeenCalledTimes(3);
  });

  it('should not call onTurnChange when clicking filled cell', () => {
    render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    
    fireEvent.click(cells[0]);
    expect(defaultProps.onTurnChange).toHaveBeenCalledTimes(1);
    
    // Click same cell again
    fireEvent.click(cells[0]);
    expect(defaultProps.onTurnChange).toHaveBeenCalledTimes(1); // Still 1
  });

  it('should initialize with empty board', () => {
    render(<GameBoard {...defaultProps} />);
    
    const cells = screen.getAllByTestId('table-cell');
    cells.forEach(cell => {
      expect(cell.getAttribute('data-icon')).toBe('');
    });
  });
});
