import React from 'react';
import WinnerPanel from './WinnerPanel';

export default {
  title: 'Components/WinnerPanel',
  component: WinnerPanel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    winner: { control: 'text' },
  },
};

const Template = (args) => <WinnerPanel {...args} />;

export const Default = Template.bind({});
Default.args = {
  winner: 'Player 1',
};

export const NoWinner = Template.bind({});
NoWinner.args = {
  winner: null,
};
