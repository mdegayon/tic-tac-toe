import React, { useState } from 'react';
import EditableField from './EditableField';

export default {
  title: 'Form/EditableField',
  component: EditableField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    className: { control: 'text' },
  },
};

// Wrapper component to manage state for the editable field
const EditableFieldWrapper = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <div style={{ minWidth: '200px' }}>
      <EditableField 
        value={value} 
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange(newValue);
        }} 
        className={args.className} 
      />
    </div>
  );
};

const Template = (args) => <EditableFieldWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'Click to edit',
  className: 'editable-field',
};

export const WithCustomStyle = Template.bind({});
WithCustomStyle.args = {
  value: 'Styled Editable Text',
  className: 'custom-editable',
};

// You can add CSS for the custom style in your global CSS or in the storybook preview
const customStyles = `
  .custom-editable {
    font-size: 1.2em;
    color: #3498db;
    font-weight: bold;
  }
  .custom-editable:focus {
    outline: 2px solid #3498db;
  }
`;

WithCustomStyle.parameters = {
  docs: {
    description: {
      story: `
        Example with custom styling. Add this CSS to your global styles:
        \`\`\`css
        ${customStyles}
        \`\`\`
      `,
    },
  },
};
