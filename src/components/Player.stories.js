import React from 'react';
import Player from './Player';

export default {
  title: 'Components/Player',
  component: Player,
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
    icon: 'nes-icon close is-large',
    avatar: 'nes-mario',
    score: 0,
  },
  index: 0,
  isCurrent: true,
};

export const Inactive = Template.bind({});
Inactive.args = {
  ...Default.args,
  isCurrent: false,
};

Inactive.parameters = {
  backgrounds: { default: 'dark' },
};
