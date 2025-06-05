import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.scss';

import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
);
