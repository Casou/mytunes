import React from "react";
import Menu from "./Menu";
import Lecteur from "./Lecteur";
import {__AUDIO_URL__} from "../../../../App";

const Header = (props) => (
  <header>
    <Menu />
    <Lecteur musique={{
        itunesId: 1,
        titre: "Musique Test",
        artiste: "Artiste test",
        duree: 283,
        bpm: 120,
        genre: "Genre test",
        classement: 100,
        timerDebut: null,
        timerFin: null,
        commentaire: "Commentaire",
        path: __AUDIO_URL__ + "test.mp3"
    } } />
  </header>
);

export default Header;