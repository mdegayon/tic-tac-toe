import '../src/index.css';
import 'nes.css/css/nes.min.css';

export const parameters = {
  actions: { 
    argTypesRegex: '^on[A-Z].*',
    expanded: true,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  layout: 'centered',
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#333333' },
    ],
  },
  options: {
    storySort: {
      order: ['App', 'Components', 'Form'],
      method: 'alphabetical',
    },
  },
  docs: {
    toc: true,
  },
  viewMode: 'docs',
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};
