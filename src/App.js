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
    {name: 'Papá', victories: 0, icon: "bi bi-x-lg" },
    {name: 'Pupu', victories: 0, icon: "bi bi-circle"}
  ]);

  return (
    <div className="App">
      <main className="App-main">
        <div className="Players">
          <div><Player player={players[0]}/></div>
          <div><Player player={players[1]}/></div>
        </div>
        <TurnPanel turnIcon={players[playerTurn].icon}/>
        <GameBoard  playerTurn={playerTurn}
                    players={players}
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

function GameBoard({playerTurn, players, onWin, onTurnChange})
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

    let updatedBoard = board.map(row => [...row]);
    updatedBoard[row][col] = icons[playerTurn];
    setBoard(updatedBoard);

    let winningRows = checkWinner(updatedBoard);
    if (winningRows) {
      setWinner(players[playerTurn].name);
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
        <WinnerPanel winner={winner} />

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

function TurnPanel({turnIcon})
{
  return(
      <div>
        <i className={turnIcon}></i>
        <br/>
        turn
      </div>
  );
}

function WinnerPanel({winner}){
  if (!winner){
    return null;
  }

  return (
      <div className="Winner">
        🏆 ¡{winner} won!
      </div>
  )
}

function checkWinner(board)
{
  let winningRows = false;
  // rows
  for (let i = 0; i < 3; i++) {

    if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]){
      winningRows = [ [i,0], [i,1], [i,2] ];
      break;
    }

  }

  // columns
  for (let i = 0; i < 3; i++) {

    if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]){
      winningRows = [ [0,i],[1,i],[2,i] ];
      break;
    }

  }

  // diagonals
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
    winningRows = [ [0,0],[1,1],[2,2] ];
  }
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
    winningRows = [ [0,2], [1,1], [2,0] ];
  }

  return winningRows;
}

export default App;

// papa eres  toli pupu no.eres toli pero te quiro muchisimo de pupu muac.