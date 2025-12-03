import React from 'react';
import GameModeSelector from './GameModeSelector';

export default {
  title: 'Components/GameModeSelector',
  component: GameModeSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const Template = (args) => <GameModeSelector {...args} />;

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  backgrounds: { default: 'light' },
};

export const WithDarkBackground = Template.bind({});
WithDarkBackground.args = {};

WithDarkBackground.parameters = {
  backgrounds: { default: 'dark' },
};
