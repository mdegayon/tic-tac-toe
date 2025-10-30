//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const[players, setPlayers] = useState([
    {name: 'Player 1', victories: 0 },
    {name: 'Player 2', victories: 0, }
  ]);

  const [playerTurn, setPlayerTurn] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const handleTurnChange = () => {
    setPlayerTurn(playerTurn ^ 1);
  };

  const handleReload = () => {
    setReloadKey(reloadKey+1);
  }

  return (
    <div className="App">
      <main className="App-main">
        <div className="Players">
          <div><Player player={players[0]}/></div>
          <div><Player player={players[1]}/></div>
        </div>

        <GameBoard  playerTurn={playerTurn}
                    players={players}
                    onTurnChange={handleTurnChange}
                    key={reloadKey}
        />

        <div className="p-3">
          <ReloadButton onReloadClick={handleReload}/>
        </div>
      </main>
    </div>
  );
}

function ReloadButton({onReloadClick})
{
  return (
      <button variant="primary" onClick={onReloadClick}>Reload</button>
  );
}

function GameBoard({playerTurn, players, onTurnChange})
{
  const icons = ["bi bi-x-lg", "bi bi-circle"];
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);
  const [winner, setWinner] = useState(null);

  const handleCellClick = function(row, col) {

    console.log("handleCellClick", row, col);
    console.log(board);
    if(winner){
      return;
    }

    if (board[row][col] !== "") {
      return;
    }

    const updatedBoard = board.map(row => [...row]);
    updatedBoard[row][col] = icons[playerTurn];
    setBoard(updatedBoard);

    if (checkWinner(updatedBoard)) {
      setWinner(playerTurn === 0 ? "Player 1" : "Player 2");

      players[playerTurn].victories = players[playerTurn].victories++;

      return;
    }

    onTurnChange();
  };

  return (
      <div className="GameBoard">
        <table className="GameBoard-table">
          <tbody>

            {board.map((row, rowIndex) => (
                <tr>
                  {row.map((cell, cellIndex) => (
                    <TableCell  playerIcon={board[rowIndex][cellIndex]}
                                onClickChange={function(){
                                handleCellClick(rowIndex,cellIndex)
                    }}/>
                  ))}
                </tr>
            ))}

          </tbody>
        </table>

        {winner && (
            <div className="Winner">
              🏆 ¡{winner} ha ganado!
            </div>
        )}

      </div>
  );
}

function TableCell({ playerIcon, onClickChange }) {

  console.log("Player Icon", playerIcon);

  return (
      <td onClick={onClickChange}>
        {playerIcon && <i className={playerIcon}></i>}
      </td>
  );
}

function Player({player}) {
  return (
      <div className="Player">
        <ul>
          <li>Name: {player.name}</li>
          <li>Victories: {player.victories}</li>
        </ul>
      </div>
  );
}

function checkWinner(board)
{
  // filas
  for (let i = 0; i < 3; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2])
      return true;
  }
  // columnas
  for (let i = 0; i < 3; i++) {
    if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i])
      return true;
  }
  // diagonales
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2])
    return true;
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0])
    return true;

  return false;
}

export default App;
