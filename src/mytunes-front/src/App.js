import React, { Component } from 'react';
import './style/App.css';
import './style/components/lecteur.css';
import './style/components/listeMusiques.css';
import './style/components/playlist.css';
import Lecteur from "./app/common/components/lecteur/Lecteur";
import ListeMusique from "./app/pages/listeMusique/containers/ListeMusique";
import Playlist from "./app/common/components/playlist/Playlist";
import WebSocketClient from "./app/common/components/websocket/WebSocketClient";
import { MuiThemeProvider } from "material-ui";
import { assign } from "lodash";
import InitApp from "./app/pages/initApp/InitApp";
import { connect } from "react-redux";

const _BASIC_URL__ = "localhost:8000/";
export const __SERVER_URL__ = "http://" + _BASIC_URL__;
export const __WEBSOCKET_URL__ = "http://" + _BASIC_URL__ + "/ws";

const App = (props) => (
  <MuiThemeProvider>
    <div className="App">
        <WebSocketClient />
        <Lecteur />
        <Playlist />
        { props.isLoading ? <InitApp/> : <ListeMusique/> }
    </div>
  </MuiThemeProvider>
);


export default connect(
  state => assign({}, {
    isLoading: state.isLoading
  }), null)(App);