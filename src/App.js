import './App.css';
import { useState } from 'react';
import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard';
import TurnPanel from './components/TurnPanel/TurnPanel';
import WinnerPanel from './components/WinnerPanel/WinnerPanel';
import ReloadButton from './components/ReloadButton/ReloadButton';
import SoundEffectService from "./services/SoundEffectService";

function App() {
  const determineStartingPlayer = () => {
    return Math.floor(Math.random() * 2); // Returns 0 or 1
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
        if (playerIndex === winnerIndex) {
          return { ...currentPlayer, victories: currentPlayer.victories + 1 };
        } else {
          return { ...currentPlayer, losses: currentPlayer.losses + 1 };
        }
      });
    });
  };

  const onTie = () => {
    setWinner('Tie!');
    setPlayers((prevPlayersState) => {
      return prevPlayersState.map((currentPlayer) => {
        return { ...currentPlayer, ties: currentPlayer.ties + 1 };
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
      losses: 0,
      ties: 0,
      icon: "nes-icon is-large heart is-empty",
      avatar: 'nes-mario',
    },
    {
      name: 'Pupu',
      victories: 0,
      losses: 0,
      ties: 0,
      icon: "nes-icon is-large star is-empty",
      avatar: 'nes-kirby',
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
                    isCurrent={playerTurn === 0}
                    side={'left'}
            />
          </div>
          <TurnPanel turnIcon={players[playerTurn].icon} />
          <div>
            <Player player={players[1]}
                    key={1}
                    index={1}
                    onNameChange={handleNameChange}
                    onAvatarChange={handleAvatarChange}
                    isCurrent={playerTurn === 1}
                    side={'right'}
            />
          </div>
        </div>

        <div>
          <div className="p-3" style={{ marginBottom: '1rem' }}>
            <ReloadButton onReloadClick={handleReload} />
          </div>
          <div className="nes-container with-title">
            <p className="title">Battle Arena</p>
            <GameBoard
              playerIndex={playerTurn}
              currentPlayer={players[playerTurn]}
              onWin={onWin}
              onTie={onTie}
              onTurnChange={handleTurnChange}
              key={reloadKey}
            />
          </div>
          <WinnerPanel winner={winner} />
        </div>
      </main>
    </div>
  );
}

export default App;