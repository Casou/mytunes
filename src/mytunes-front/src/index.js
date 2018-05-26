import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./app/reducers";
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom"

import {composeWithDevTools} from 'redux-devtools-extension';

import CurrentPlaylistManager from "./app/common/beans/CurrentPlaylistManager";
import PlaylistProvider from "./app/common/beans/PlaylistProvider";

const initialStore = {
    isLoading: {
        general : false,
        application : true
    },
    musiques: null,
    genres: null,
    playlistManager: new CurrentPlaylistManager(),
    playlistProvider : new PlaylistProvider([])
};
const store = createStore(reducers, initialStore,
    composeWithDevTools(applyMiddleware(thunk)));
// compose(applyMiddleware(thunk), window.devToolsExtension && window.devToolsExtension()));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();

// String.prototype.hashCode = function() {
//     let hash = 0;
//     if (this.length === 0) {
//         return hash;
//     }
//     for (let i = 0; i < this.length; i++) {
//         const char = this.charCodeAt(i);
//         hash = ((hash<<5)-hash)+char;
//         hash = hash & hash; // Convert to 32bit integer
//     }
//     return hash;
// };
