import React from 'react';
import './style/App.css';
import './style/components/lecteur.css';
import './style/components/header.css';
import './style/material-icons.css';

import {bindActionCreators} from "redux";

import {MuiThemeProvider} from "material-ui";

import {connect} from "react-redux";
import {assign} from "lodash";

import {Route} from "react-router-dom";
import WebSocketClient from "./app/common/components/websocket/WebSocketClient";
import WebSocketActions from "./app/common/actions/WebSocketActions";
import DesktopWrapper from "./app/pages/initApp/DesktopWrapper";
import MobileWrapper from "./app/pages/mobile/MobileWrapper";
import RouteWrapper from "./app/pages/initApp/RouteWrapper";

import 'react-notifications/lib/notifications.css';

const HOST_SERVER = window.location.hostname;

const __BASIC_URL__ = HOST_SERVER + ":8000/";
export const __SERVER_URL__ = "http://" + __BASIC_URL__;
export const __WEBSOCKET_URL__ = __SERVER_URL__ + "ws";
export const __KEYCODE_ENTER__ = 13;

export const __LOCAL_STORAGE__PLAYLIST_MANAGER__ = "playlistManager";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.wsClient = null;

        this._subscribe = this._subscribe.bind(this);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <WebSocketClient url={ __WEBSOCKET_URL__ }
                                     onConnect={ this._subscribe }
                                     onMessage={ this._handleMessage }
                                     debug={ false }
                                     ref={ (client) => { this.wsClient = client }} />

                    <Route exact path="/" component={RouteWrapper}/>
                    <Route path="/desktop" component={DesktopWrapper}/>
                    <Route path="/mobile" component={MobileWrapper}/>
                </div>
            </MuiThemeProvider>
        );
    }

    _subscribe() {
        this.props.webSocketActions.setWsClient(this.wsClient);
    }

    _handleMessage(message, topic) {
    }
}


export default connect(state => assign({}, {
    wsClient: state.wsClient
}), dispatch => ({
    webSocketActions: bindActionCreators(WebSocketActions, dispatch)
}))(App);