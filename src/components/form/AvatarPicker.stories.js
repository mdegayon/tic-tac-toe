import React, { useState } from 'react';
import AvatarPicker from './AvatarPicker';

export default {
  title: 'Components/AvatarPicker',
  component: AvatarPicker,
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSelect: { action: 'avatar selected' },
    onClose: { action: 'closed' },
  },
};

const Template = (args) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  
  return (
    <div>
      <AvatarPicker 
        {...args} 
        onSelect={(avatar) => {
          setSelectedAvatar(avatar);
          args.onSelect(avatar);
        }} 
      />
      {selectedAvatar && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Selected: <i className={selectedAvatar}></i></p>
        </div>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  onClose: () => {},
};

Default.parameters = {
  backgrounds: { default: 'light' },
};
