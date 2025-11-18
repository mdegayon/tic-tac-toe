import '../src/index.css';
import 'nes.css/css/nes.min.css';

// Import Press Start 2P font from Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

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
