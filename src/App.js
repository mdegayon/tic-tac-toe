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

function GameBoard({playerTurn, onTurnChange}) {
  return (
      <div className="GameBoard">
        <table className="GameBoard-table">
          <tbody>
          <tr>
            <TableCell row={0} col={0} playerTurn={playerTurn} onTurnChange={onTurnChange}/>
            <TableCell row={1} col={0} playerTurn={playerTurn} onTurnChange={onTurnChange}/>
            <TableCell row={2} col={0} playerTurn={playerTurn} onTurnChange={onTurnChange}/>
          </tr>
          <tr>
            <TableCell row={0} col={1} playerTurn={playerTurn} onTurnChange={onTurnChange}/>
            <TableCell row={1} col={1} playerTurn={playerTurn} onTurnChange={onTurnChange}/>
            <TableCell row={2} col={1} playerTurn={playerTurn} onTurnChange={onTurnChange}/>
          </tr>
          <tr>
            <TableCell row={0} col={2} playerTurn={playerTurn} onTurnChange={onTurnChange}/>
            <TableCell row={1} col={2} playerTurn={playerTurn} onTurnChange={onTurnChange}/>
            <TableCell row={2} col={2} playerTurn={playerTurn} onTurnChange={onTurnChange}/>
          </tr>
          </tbody>
        </table>
      </div>
  );
}

function TableCell({ row, col, playerTurn, onTurnChange }) {

  const [playerIcon, setPlayerIcon] = useState("");

  let icons = [
    "bi bi-x-lg",
    "bi bi-circle"
  ];

  const handleRowClick = () => {
    setPlayerIcon(icons[playerTurn]);
    onTurnChange();
  };

  return (
      <td data-col={col} data-row={row} onClick={handleRowClick}>
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

export default App;
