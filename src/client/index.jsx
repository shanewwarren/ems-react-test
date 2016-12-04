import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { isProduction } from './utils/environment';

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
  console.log('here');
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