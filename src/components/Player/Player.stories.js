import React from 'react';
import Player from './Player';
import './Player.css';

export default {
  title: 'Components/Player',
  component: Player,
  decorators: [
    (Story) => (
      <div style={{ 
        width: '300px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        margin: '20px auto'
      }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onNameChange: { action: 'name changed' },
    onAvatarChange: { action: 'avatar changed' },
    isCurrent: { control: 'boolean' },
  },
};

const Template = (args) => <Player {...args} />;

export const Default = Template.bind({});
Default.args = {
  player: {
    name: 'Player 1',
    icon: 'nes-icon is-large heart',
    avatar: 'nes-mario',
    victories: 0,
  },
  index: 0,
  isCurrent: true,
};

export const WithVictories = Template.bind({});
WithVictories.args = {
  player: {
    name: 'Champion',
    icon: 'nes-icon is-large star',
    avatar: 'nes-kirby',
    victories: 5,
  },
  index: 1,
  isCurrent: false,
};

export const Inactive = Template.bind({});
Inactive.args = {
  player: {
    name: 'Inactive Player',
    icon: 'nes-icon is-large close',
    avatar: 'nes-ash',
    victories: 2,
  },
  index: 2,
  isCurrent: false,
};

Inactive.parameters = {
  backgrounds: { default: 'dark' },
};

// Add some global styles for the storybook preview
const styles = `
  .sb-show-main {
    padding: 2rem !important;
  }
  .nes-container {
    margin: 1rem 0;
  }
  .player-info {
    margin-top: 1rem;
  }
  .player-name {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .player-score {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
