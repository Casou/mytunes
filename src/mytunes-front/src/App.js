import React from 'react';
import './style/App.css';
import './style/components/lecteur.css';
import './style/components/header.css';
import './style/material-icons.css';
import 'react-notifications/lib/notifications.css';

import Header from "./app/common/components/header/Header";
import WebSocketClient from "./app/common/components/websocket/WebSocketClient";
import MainWrapper from "./app/pages/initApp/MainWrapper";
import {MuiThemeProvider} from "material-ui";
import {NotificationContainer} from "react-notifications";

import {Route, Redirect} from "react-router-dom";
import ListeMusique from "./app/pages/listeMusique/containers/ListeMusique";
import ListeGenres from "./app/pages/listeGenres/containers/ListeGenres";
import SavedPlaylists from "./app/pages/savedPlaylists/container/SavedPlaylists";

const __BASIC_URL__ = "localhost:8000/";
export const __SERVER_URL__ = "http://" + __BASIC_URL__;
export const __WEBSOCKET_URL__ = "http://" + __BASIC_URL__ + "/ws";
export const __KEYCODE_ENTER__ = 13;


const App = () => (
    <MuiThemeProvider>
        <div className="App">
            <WebSocketClient/>
            <Header/>
            <MainWrapper>
                <Redirect from="/" to="musiques"/>
                <Route exact path="/musiques" component={ListeMusique}/>
                <Route exact path="/genres/:genreId?" component={ListeGenres}/>
                <Route exact path="/playlists" component={SavedPlaylists}/>
            </MainWrapper>
            <NotificationContainer/>
        </div>
    </MuiThemeProvider>
);

export default App;