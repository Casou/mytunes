import React from 'react';
import {NotificationContainer} from "react-notifications";
import {Route} from "react-router-dom";

import ListeMusique from "../listeMusique/containers/ListeMusique";
import SavedPlaylists from "../savedPlaylists/container/SavedPlaylists";
import ListeGenres from "../listeGenres/containers/ListeGenres";
import Parametres from "../parametres/Parametres";
import Header from "../../common/components/header/Header";
import MainWrapper from "./MainWrapper";

const DesktopWrapper = () => {
    return (
    <div className="App">
        <Header/>
        <MainWrapper>
            <Route exact path="/desktop/musiques" component={ListeMusique}/>
            <Route exact path="/desktop/genres/:genreId?" component={ListeGenres}/>
            <Route exact path="/desktop/playlists/:playlistId?" component={SavedPlaylists}/>
            <Route exact path="/desktop/parametres" component={Parametres}/>
            <Route exact path="/desktop/" component={ListeMusique}/>
        </MainWrapper>
        <NotificationContainer/>
    </div>);
};

DesktopWrapper.propTypes = {};

export default DesktopWrapper;