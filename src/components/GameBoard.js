import React, { useState } from 'react';
import TableCell from './TableCell';
import { checkWinner } from '../utils/gameLogic';

function GameBoard({playerIndex, currentPlayer, onWin, onTurnChange}) {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);

  const handleCellClick = function(row, col) {
    if (board[row][col] !== "") {
      return;
    }

    let updatedBoard = board.map(row => [...row]);
    updatedBoard[row][col] = currentPlayer.icon;
    setBoard(updatedBoard);

    let winningRows = checkWinner(updatedBoard);
    if (winningRows) {
      onWin(playerIndex);
      return;
    }

    onTurnChange();
  };

  return (
    <div className="GameBoard">
      <table className="GameBoard-table">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={`${rowIndex}-${cellIndex}`}
                  playerIcon={board[rowIndex][cellIndex]}
                  onClickChange={() => {
                    handleCellClick(rowIndex, cellIndex);
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameBoard;
