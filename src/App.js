import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const player1 = {
  name: 'Player 1',
  victories: 0,
};
const player2 = {
  name: 'Player 2',
  victories: 0,
};

function App() {

  // const xor
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  return (
    <div className="App">
      <main className="App-main">
        <div className="Players">
          <div><Player player={player1}/></div>
          <div><Player player={player2}/></div>
        </div>
          <GameBoard/>
      </main>
    </div>
);
}

function GameBoard(){

  function handleRowClick(){
    console.log("You clicked");
  }

  return (
      <div className="GameBoard">
        <table className="GameBoard-table">
          <tbody>
          <tr>
            <td data-col='0' data-row='0' onClick={handleRowClick}></td>
            <td data-col='1' data-row='0' onClick={handleRowClick}></td>
            <td data-col='2' data-row='0' onClick={handleRowClick}></td>
          </tr>
          <tr>
            <td data-col='0' data-row='1' onClick={handleRowClick}></td>
            <td data-col='1' data-row='1' onClick={handleRowClick}></td>
            <td data-col='2' data-row='1' onClick={handleRowClick}></td>
          </tr>
          <tr>
            <td data-col='0' data-row='2' onClick={handleRowClick}></td>
            <td data-col='1' data-row='2' onClick={handleRowClick}></td>
            <td data-col='2' data-row='2' onClick={handleRowClick}></td>
          </tr>
          </tbody>
        </table>
      </div>
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
