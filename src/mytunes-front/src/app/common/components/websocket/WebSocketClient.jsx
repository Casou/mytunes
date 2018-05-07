import React, { Component } from 'react';
import { __WEBSOCKET_URL__ } from '../../../../App';
import SockJsClient from 'react-stomp';

class WebSocketClient extends Component {
  
  constructor(props) {
    super(props);
    this.stompClient = null;
  }
  
  onWsMessage(message) {
    console.log("MESSAGE", message);
  }
  
  onWsConnect() {
    console.log("[Websocket] CONNECTED");
  }
  
  onWsDisconnect() {
    console.log("[Websocket] DISCONNECTED");
  }
  
  componentWillUnmount() {
    this.stompClient.disconnect();
  }
  
  render() {
    return (
      <SockJsClient url={ __WEBSOCKET_URL__ }
                    topics={['/topic/musiques/updateClassement']}
                    onMessage={ this.onWsMessage.bind(this) }
                    onConnect={ this.onWsConnect.bind(this) }
                    onDisconnect={ this.onWsDisconnect.bind(this) }
                    debug={ true }
                    ref={ (client) => { this.stompClient = client }} />
    );
  }
}

export default WebSocketClient;
