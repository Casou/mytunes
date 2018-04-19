import React, { Component } from 'react';
import './style/App.css';
import './style/components/lecteur.css';
import './style/components/listeMusiques.css';
import './style/components/playlist.css';
import Lecteur from "./app/common/components/lecteur/Lecteur";
import ListeMusique from "./app/pages/listeMusique/containers/ListeMusique";
import Playlist from "./app/common/components/playlist/Playlist";

export const __SERVER_URL__ = "http://localhost:8000/";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Lecteur />
          <ListeMusique />
          <Playlist />
      </div>
    );
  }
}

export default App;
