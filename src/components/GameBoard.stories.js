import React, { useState } from 'react';
import GameBoard from './GameBoard';

export default {
  title: 'Components/GameBoard',
  component: GameBoard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onWin: { action: 'game won' },
    onTurnChange: { action: 'turn changed' },
  },
};

const Template = (args) => {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const players = [
    { name: 'Player 1', icon: 'nes-icon close is-large', score: 0 },
    { name: 'Player 2', icon: 'nes-icon trophy is-large', score: 0 },
  ];

  const handleWin = (playerIndex) => {
    args.onWin(playerIndex);
  };

  const handleTurnChange = () => {
    setCurrentPlayer((prev) => (prev === 0 ? 1 : 0));
    args.onTurnChange();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Current Turn: {players[currentPlayer].name}</h3>
      </div>
      <GameBoard
        playerIndex={currentPlayer}
        currentPlayer={players[currentPlayer]}
        onWin={handleWin}
        onTurnChange={handleTurnChange}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  backgrounds: { default: 'light' },
};
