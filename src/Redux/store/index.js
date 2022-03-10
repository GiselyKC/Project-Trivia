import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer';

const store = createStore(reducer, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}

export default store;
