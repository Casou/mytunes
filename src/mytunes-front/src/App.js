import React from 'react';
import './style/App.css';
import './style/components/lecteur.css';
import './style/components/header.css';
import './style/components/listeMusiques.css';
import './style/components/playlist.css';
import './style/material-icons.css';
import 'react-notifications/lib/notifications.css';

import Header from "./app/common/components/header/Header";
import ListeMusique from "./app/pages/listeMusique/containers/ListeMusique";
import ListeGenres from "./app/pages/listeGenres/ListeGenres";
import Playlist from "./app/common/components/playlist/Playlist";
import WebSocketClient from "./app/common/components/websocket/WebSocketClient";
import MainWrapper from "./app/pages/initApp/MainWrapper";
import { MuiThemeProvider } from "material-ui";git
import { Route, BrowserRouter } from "react-router-dom";
import {NotificationContainer} from "react-notifications";

const __BASIC_URL__ = "localhost:8000/";
export const __SERVER_URL__ = "http://" + __BASIC_URL__;
export const __WEBSOCKET_URL__ = "http://" + __BASIC_URL__ + "/ws";
export const __KEYCODE_ENTER__ = 13;

const App = () => (
  <MuiThemeProvider>
    <BrowserRouter>
      <div className="App">
        <WebSocketClient />
        <Header />
        <Playlist />
        <MainWrapper>
          <Route exact path="/" component={ListeMusique} />
          <Route exact path="/genres" component={ListeGenres} />
        </MainWrapper>
        <NotificationContainer/>
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;