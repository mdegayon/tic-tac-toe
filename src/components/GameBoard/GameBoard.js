import React, { useState } from 'react';
import TableCell from '../TableCell/TableCell';
import { checkWinner } from '../../utils/gameLogic';
import soundEffectService from "../../services/SoundEffectService";

function GameBoard({playerIndex, currentPlayer, onWin, onTurnChange}) {

  const [winningRows, setWinningRows] = useState(null);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);

  const handleCellClick = function(row, col) {

    if (board[row][col] !== "") {
      soundEffectService.trigger('cell:click-err');
      return;
    }

    if (winningRows !== null) {
      soundEffectService.trigger('cell:click-err');
      return;
    }

    soundEffectService.trigger('cell:click');

    let updatedBoard = board.map(row => [...row]);
    updatedBoard[row][col] = currentPlayer.icon;
    setBoard(updatedBoard);

    const checkResult = checkWinner(updatedBoard);
    if (checkResult) {
      setWinningRows( checkResult );
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
                  isWinningRow={winningRows && winningRows.some(([r, c]) => r === rowIndex && c === cellIndex)}
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
