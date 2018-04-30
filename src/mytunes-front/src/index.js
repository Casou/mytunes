import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./app/reducers";
import thunk from "redux-thunk";
import { Route, BrowserRouter } from "react-router-dom";
import ListeMusique from "./app/pages/listeMusique/containers/ListeMusique";
import ListeGenres from "./app/pages/listeGenres/ListeGenres";

import { composeWithDevTools } from 'redux-devtools-extension';

const initialStore = {
  isLoading : true,
  musiques : []
};
const store = createStore(reducers, initialStore,
    composeWithDevTools(applyMiddleware(thunk)));
  // compose(applyMiddleware(thunk), window.devToolsExtension && window.devToolsExtension()));

ReactDOM.render(
  <Provider store={ store }>
      <BrowserRouter>
          <App>
              <Route exact path="/" component={ListeMusique} />
              <Route exact path="/genres" component={ListeGenres} />
          </App>
      </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
