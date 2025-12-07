
import { createRoot } from 'react-dom/client';
import './index.css';

import React from 'react';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import App from "../src/app/App.jsx"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
);
