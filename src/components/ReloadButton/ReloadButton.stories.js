import React from 'react';
import ReloadButton from './ReloadButton';

export default {
  title: 'Components/ReloadButton',
  component: ReloadButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onReloadClick: { action: 'reloadClicked' },
  },
};

const Template = (args) => <ReloadButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onReloadClick: () => console.log('Reload button clicked'),
};

// Add a decorator to show the click action in the actions panel
Default.parameters = {
  actions: {
    handles: ['click'],
  },
};
