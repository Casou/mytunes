import React from "react";
import Menu from "./Menu";
import Lecteur from "./Lecteur";

const Header = (props) => (
  <header>
    <Menu />
    <Lecteur musique={{
        itunesId: 1,
        titre: "Musique Test",
        artiste: "Artiste test",
        duree: 254,
        bpm: 120,
        genre: "Genre test",
        classement: 100,
        timerDebut: null,
        timerFin: null,
        commentaire: "Commentaire",
        path: "/path"
    } } />
  </header>
);

export default Header;