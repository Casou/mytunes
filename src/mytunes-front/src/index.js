import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import reducers from "./app/reducers";
import thunk from "redux-thunk";

const initialStore = {
  isLoading : true,
  musiques : []
};
const store = createStore(reducers, initialStore,
  compose(applyMiddleware(thunk), window.devToolsExtension && window.devToolsExtension()));

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
