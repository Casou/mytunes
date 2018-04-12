import React, { Component } from 'react';
import './style/App.css';
import './style/components/lecteur.css';
import './style/components/listeMusiques.css';
import Lecteur from "./app/common/components/lecteur/Lecteur";
import ListeMusique from "./app/common/components/listeMusique/ListeMusique";

class App extends Component {
  musiques = [
    { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 182437, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" }
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" },
    // { itunesId : 1, nom : "Chanson 1", artiste : "Artiste 1", duree : 131552, bpm : 220, genres : ["Lindy", "Boogie"], classement : 80, path : "/handler/musiques/musique1.mp3", },
    // { itunesId : 2, nom : "Chanson 2", artiste : "Artiste 1", duree : 142365, bpm : 160, genres : ["4 temps"], classement : 100, path : "/handler/musiques/musique2.mp3" },
    // { itunesId : 3, nom : "Chanson 3", artiste : "Artiste 2", duree : 94532, genres : ["Lindy", "4 temps"], classement : 60, path : "/handler/musiques/musique3.mp3", commentaire : "Un commentaire" }
    
  ];
  
  render() {
    return (
      <div className="App">
          <Lecteur />
          <ListeMusique musiques={ this.musiques } />
      </div>
    );
  }
}



export default App;
