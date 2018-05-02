import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./app/reducers";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom"

import { composeWithDevTools } from 'redux-devtools-extension';

const initialStore = {
  isLoading : true,
  musiques : [],
  playlist : []
};
const store = createStore(reducers, initialStore,
    composeWithDevTools(applyMiddleware(thunk)));
  // compose(applyMiddleware(thunk), window.devToolsExtension && window.devToolsExtension()));

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
