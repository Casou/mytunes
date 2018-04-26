import React, { Component } from 'react';
import './style/App.css';
import './style/components/lecteur.css';
import './style/components/header.css';
import './style/components/listeMusiques.css';
import './style/components/playlist.css';
import Header from "./app/common/components/header/Header";
import ListeMusique from "./app/pages/listeMusique/containers/ListeMusique";
import ListeGenres from "./app/pages/listeGenres/ListeGenres";
import Playlist from "./app/common/components/playlist/Playlist";
import WebSocketClient from "./app/common/components/websocket/WebSocketClient";
import { MuiThemeProvider } from "material-ui";
import { assign } from "lodash";
import InitApp from "./app/pages/initApp/InitApp";
import { connect } from "react-redux";
import MusiquesActions from "./app/pages/listeMusique/actions/MusiquesActions";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {Route, BrowserRouter} from "react-router-dom";

const _BASIC_URL__ = "localhost:8000/";
export const __SERVER_URL__ = "http://" + _BASIC_URL__;
export const __WEBSOCKET_URL__ = "http://" + _BASIC_URL__ + "/ws";

const App = (props) => (
  <MuiThemeProvider>
    <BrowserRouter>
      <div className="App">
          <WebSocketClient />
          <Header />
          <Playlist />
          {
            props.isLoading ?
            <InitApp/>
            :
            <main>
              <Route exact path="/" component={ListeMusique} />
              <Route exact path="/genres" component={ListeGenres} />
            </main>
          }
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default connect(
  state => assign({}, {
    isLoading: state.isLoading
  }), null)(App);
