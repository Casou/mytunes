import React from 'react';
import {NotificationContainer} from "react-notifications";
import {Route} from "react-router-dom";

import ListeMusique from "../listeMusique/containers/ListeMusique";
import SavedPlaylists from "../savedPlaylists/container/SavedPlaylists";
import ListeGenres from "../listeGenres/containers/ListeGenres";
import Parametres from "../parametres/Parametres";
import Header from "../../common/components/header/Header";
import MainWrapper from "./MainWrapper";
import {__DESKTOP_URL__} from "../../../App";

const DesktopWrapper = () => {
    return (
    <div className="App">
        <Header/>
        <MainWrapper>
            <Route exact path={ __DESKTOP_URL__ + "/musiques" } component={ListeMusique}/>
            <Route exact path={ __DESKTOP_URL__ + "/genres/:genreId?" } component={ListeGenres}/>
            <Route exact path={ __DESKTOP_URL__ + "/playlists/:playlistId?" } component={SavedPlaylists}/>
            <Route exact path={ __DESKTOP_URL__ + "/parametres" } component={Parametres}/>
            <Route exact path={ __DESKTOP_URL__ } component={ListeMusique}/>
        </MainWrapper>
        <NotificationContainer/>
    </div>);
};

DesktopWrapper.propTypes = {};

export default DesktopWrapper;