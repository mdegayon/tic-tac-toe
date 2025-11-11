import React, { useState } from 'react';
import App from './App';
import '../src/index.css';
import 'nes.css/css/nes.min.css';

export default {
  title: 'App',
  component: App,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}>
        <Story />
      </div>
    ),
  ],
};

// Default story shows the app in its initial state
export const Default = () => <App />;

// Story showing a game in progress with custom player names
export const GameInProgress = () => {
  const [players] = useState([
    {
      name: 'Player 1',
      victories: 2,
      icon: "nes-icon is-large heart is-empty",
      avatar: 'nes-mario',
    },
    {
      name: 'Player 2',
      victories: 1,
      icon: "nes-icon is-large star is-empty",
      avatar: 'nes-kirby',
    }
  ]);
  
  return <App initialPlayers={players} />;
};

// Story showing a completed game with a winner
export const GameWithWinner = () => {
  const [players] = useState([
    {
      name: 'Winner',
      victories: 3,
      icon: "nes-icon is-large heart is-empty",
      avatar: 'nes-mario',
    },
    {
      name: 'Runner-up',
      victories: 1,
      icon: "nes-icon is-large star is-empty",
      avatar: 'nes-kirby',
    }
  ]);
  
  return <App initialPlayers={players} initialWinner="Winner" />;
};

// Story showing the mobile layout
export const MobileLayout = () => {
  const MobileDecorator = (Story) => (
    <div style={{ 
      maxWidth: '375px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: 'white',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Story />
    </div>
  );
  
  return (
    <MobileDecorator>
      <App />
    </MobileDecorator>
  );
};

MobileLayout.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
