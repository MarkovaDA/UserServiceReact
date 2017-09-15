import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {itemClickSubscribe} from "./reducers/itemClickReducer";
import {reducer} from './reducers/reducer';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(itemClickSubscribe);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
