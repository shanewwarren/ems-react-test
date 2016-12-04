import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { isProduction } from './utils/environment';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Specifically for Material-UI components.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import App from './components/App';

import { getStores } from './stores';
const stores = getStores();

// Import our styles
require('../assets/css/index.styl');

render(
  <AppContainer>
      <App stores={stores} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot && !isProduction()) {

  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;

    render(
      <AppContainer>
        <NextApp stores={stores} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}