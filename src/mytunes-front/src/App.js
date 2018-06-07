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
import Favicon from 'react-favicon';

import {Route} from "react-router-dom";
import ListeMusique from "./app/pages/listeMusique/containers/ListeMusique";
import ListeGenres from "./app/pages/listeGenres/containers/ListeGenres";
import SavedPlaylists from "./app/pages/savedPlaylists/container/SavedPlaylists";
import Parametres from "./app/pages/parametres/Parametres";

const __BASIC_URL__ = "localhost:8000/";
export const __SERVER_URL__ = "http://" + __BASIC_URL__;
export const __WEBSOCKET_URL__ = __SERVER_URL__ + "ws";
export const __KEYCODE_ENTER__ = 13;

export const __LOCAL_STORAGE__PLAYLIST_MANAGER__ = "playlistManager";


const App = () => (
    <MuiThemeProvider>
        <div className="App">
            <Favicon url="https://cdn0.iconfinder.com/data/icons/pack-web-app-game/512/play-button-128.png" />
            <Header/>
            <MainWrapper>
                <Route exact path="/" component={ListeMusique}/>
                <Route exact path="/musiques" component={ListeMusique}/>
                <Route exact path="/genres/:genreId?" component={ListeGenres}/>
                <Route exact path="/playlists/:playlistId?" component={SavedPlaylists}/>
                <Route exact path="/parametres" component={Parametres}/>
            </MainWrapper>
            <NotificationContainer/>
        </div>
    </MuiThemeProvider>
);

export default App;