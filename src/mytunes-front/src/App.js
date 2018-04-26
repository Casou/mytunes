import React, { Component } from 'react';
import './style/App.css';
import './style/components/lecteur.css';
import './style/components/listeMusiques.css';
import './style/components/playlist.css';
import Lecteur from "./app/common/components/lecteur/Lecteur";
import ListeMusique from "./app/pages/listeMusique/containers/ListeMusique";
import Playlist from "./app/common/components/playlist/Playlist";
import WebSocketClient from "./app/common/components/websocket/WebSocketClient";
import {MuiThemeProvider} from "material-ui";
import {connect, Provider} from "react-redux";
import {createStore} from "redux";
import {assign} from "lodash";
import MusiquesActions from "./app/pages/listeMusique/actions/MusiquesActions";

const _BASIC_URL__ = "localhost:8000/";
export const __SERVER_URL__ = "http://" + _BASIC_URL__;
export const __WEBSOCKET_URL__ = "http://" + _BASIC_URL__ + "/ws";

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    MusiquesActions.getAllMusiques();
    
    // fetch(__SERVER_URL__ + "all-musiques") //, { mode: 'no-cors' })
    // .then(response => response.json())
    // .then(musiques => {
    //   this.setState({
    //     ...this.state,
    //     musiques
    //   });
    // })
    // .catch(e => {
    //   console.error(e);
    // });
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
            <WebSocketClient />
            <Lecteur />
            <ListeMusique />
            <Playlist />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

// export default connect(
//   null,
//   // state => assign({}, {
//   //   musiques: state.musiques
//   // })
//   dispatch => ({
//     musiquesActions: bindActionCreators(GlobalActions, dispatch)
// }))(App);