import './App.css';
import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import TurnPanel from './components/TurnPanel';
import WinnerPanel from './components/WinnerPanel';
import ReloadButton from './components/ReloadButton';
import SoundEffectService from "./services/SoundEffectService";

function App() {
  const determineStartingPlayer = () => {
    return Math.floor(Math.random() * 2);
  };

  const handleTurnChange = () => {
    setPlayerTurn(playerTurn ^ 1);
  };

  const handleNameChange = (index, newName) => {
    setPlayers(prev =>
        prev.map((player, i) =>
            i === index ? { ...player, name: newName } : player
        )
    );
  };

  const handleAvatarChange = (index, newAvatar) => {
    setPlayers(prev =>
        prev.map((p, i) => (i === index ? { ...p, avatar: newAvatar } : p))
    );
  };

  const onWin = (winnerIndex) => {

    SoundEffectService.trigger('game:win');

    setWinner(players[winnerIndex].name);
    setPlayers((prevPlayersState) => {
      return prevPlayersState.map((currentPlayer, playerIndex) => {
        return (playerIndex === winnerIndex) 
          ? { ...currentPlayer, victories: currentPlayer.victories + 1 }
          : currentPlayer;
      });
    });
  };

  const handleReload = () => {
    setReloadKey(reloadKey + 1);
    setWinner(null);
    setPlayerTurn(determineStartingPlayer());
  };

  const [reloadKey, setReloadKey] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(determineStartingPlayer());
  const [winner, setWinner] = useState(null);
  const [players, setPlayers] = useState([
    {
      name: 'Papá',
      victories: 0,
      icon: "nes-icon is-large heart is-empty",
      avatar: 'nes-mario'
    },
    {
      name: 'Pupu',
      victories: 0,
      icon: "nes-icon is-large star is-empty",
      avatar: 'nes-kirby'
    }
  ]);

  return (
    <div className="App">
      <main className="App-main">

        <div className="Players">
          <div>
            <Player player={players[0]}
                    key={0}
                    index={0}
                    onNameChange={handleNameChange}
                    onAvatarChange={handleAvatarChange}
            />
          </div>
          <TurnPanel turnIcon={players[playerTurn].icon} />
          <div>
            <Player player={players[1]}
                    key={1}
                    index={1}
                    onNameChange={handleNameChange}
                    onAvatarChange={handleAvatarChange}
            />
          </div>
        </div>

        <div>
          <GameBoard
            playerIndex={playerTurn}
            currentPlayer={players[playerTurn]}
            onWin={onWin}
            onTurnChange={handleTurnChange}
            key={reloadKey}
          />
          <WinnerPanel winner={winner} />
          <div className="p-3">
            <ReloadButton onReloadClick={handleReload} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;