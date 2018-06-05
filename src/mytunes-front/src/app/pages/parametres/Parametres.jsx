import React from 'react';
import {__SERVER_URL__, __WEBSOCKET_URL__} from "../../../App";
import SockJsClient from 'react-stomp';

class Parametres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.clientRef = null;
    }

    onWsMessage(message) {
        console.log("MESSAGE 2", message);
    }

    onWsConnect() {
        console.log("SockJs CONNECTED");
    }

    onWsDisconnect() {
        console.log("SockJs DISCONNECTED");
    }
    onWsError(e) {
        console.error(e);
    }

    componentWillUnmount() {
        this.clientRef.disconnect();
    }


    render() {
        return (
        <div>
            <h1>Test</h1>
            <button onClick={ this._sendDatas.bind(this) }>Test WS</button>


            <SockJsClient url={ __WEBSOCKET_URL__ }
                          topics={["/topic/all"]}
                          onMessage={ this.onWsMessage }
                          ref={ (client) => { this.clientRef = client }}
                          onConnect={ this.onWsConnect }
                          onDisconnect={ this.onWsDisconnect }
                          debug={ false }/>
        </div>);
    }

    _sendDatas() {
        console.log("Send");
        // this.sockjs.send(__WEBSOCKET_URL__ + "/action/musiques/updateClassement", {}, JSON.stringify({
        //     musique : { id : 1 },
        //     newClassement : 100
        // });
        this.clientRef.sendMessage("/app/action/musiques/updateClassement",
            JSON.stringify({
                musique : { id : 1 },
                newClassement : 100
            }));

    }
}

export default Parametres;