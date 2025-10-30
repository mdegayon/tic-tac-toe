//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const determineStartingPlayer = () => {
    return Math.floor(Math.random() * 2);
  };

  const handleTurnChange = () => {
    setPlayerTurn(playerTurn ^ 1);
  };

  const onWin = function(winnerIndex)
  {
    setPlayers( (prevPlayersState) => {

      return prevPlayersState.map( function(currentPlayer, playerIndex){

          return (playerIndex === winnerIndex)  ? {...currentPlayer, victories: currentPlayer.victories + 1}
                                                : currentPlayer;
      });

    });
  };

  const handleReload = () => {
    setReloadKey(reloadKey+1);
    setPlayerTurn(determineStartingPlayer());
  }

  const [reloadKey, setReloadKey] = useState(0);

  const [playerTurn, setPlayerTurn] = useState(determineStartingPlayer());

  const[players, setPlayers] = useState([
    {name: 'Player 1', victories: 0, icon: "bi bi-x-lg" },
    {name: 'Player 2', victories: 0, icon: "bi bi-circle"}
  ]);

  return (
    <div className="App">
      <main className="App-main">
        <div className="Players">
          <div><Player player={players[0]}/></div>
          <div><Player player={players[1]}/></div>
        </div>

        <GameBoard  playerTurn={playerTurn}
                    onWin={onWin}
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

function GameBoard({playerTurn, onWin, onTurnChange})
{
  const icons = ["bi bi-x-lg", "bi bi-circle"];
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);
  const [winner, setWinner] = useState(null);

  const handleCellClick = function(row, col) {

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
      onWin(playerTurn);
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
                                }}
                    />
                  ))}
                </tr>
            ))}

          </tbody>
        </table>

        {winner && (
            <div className="Winner">
              🏆 ¡{winner} won!
            </div>
        )}

      </div>
  );
}

function TableCell({ playerIcon, onClickChange }) {

  return (
      <td onClick={onClickChange}>
        {playerIcon && <i className={playerIcon}></i>}
      </td>
  );
}

function Player({player}) {
  return (
      <div className="Player">
        <i className={player.icon}></i>
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
