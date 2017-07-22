/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import configureStore from './redux/store';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './modules/app/containers/App';
import initServiceWorker from './sw';

// Initialize store
const store = configureStore(browserHistory, window.__INITIAL_STATE__);

// Mount into #app
const mountApp = document.getElementById('app');

// Initialize Servicie Worker register code
// initServiceWorker();

render(
  <AppContainer>
    <App store={store} browserHistory={browserHistory} />
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./modules/app/containers/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./modules/app/containers/App').default; // eslint-disable-line global-require

    render(
      <AppContainer>
        <App store={store} browserHistory={browserHistory} />
      </AppContainer>,
      mountApp
    );
  });
}
