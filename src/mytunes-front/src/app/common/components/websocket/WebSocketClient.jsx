import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { __WEBSOCKET_URL__ } from '../../../../App';
import SockJsClient from 'react-stomp';

class WebSocketClient extends Component {
  
  constructor(props) {
    super(props);
    this.stompClient = null;
  }
  
  onWsMessage(message) {
    console.log(`[${ this.props.name }] MESSAGE`, message);
  }
  
  onWsConnect() {
    console.log(`[${ this.props.name }] CONNECTED`);
  }
  
  onWsDisconnect() {
      console.log(`[${ this.props.name }] DISCONNECTED`);
  }
  
  componentWillUnmount() {
    this.stompClient.disconnect();
  }
  
  render() {
    return (
      <SockJsClient url={ __WEBSOCKET_URL__ }
                    topics={ this.props.topics }
                    onMessage={ this.onWsMessage.bind(this) }
                    onConnect={ this.onWsConnect.bind(this) }
                    onDisconnect={ this.onWsDisconnect.bind(this) }
                    debug={ this.props.debug }
                    ref={ (client) => { this.stompClient = client }} />
    );
  }

  send(url, payload) {
      console.log(`[${ this.props.name }] send`, url, payload);
      this.stompClient.sendMessage(url, JSON.stringify(payload));
  }
}

WebSocketClient.propTypes = {
    topics : PropTypes.array,
    debug : PropTypes.bool,
    name : PropTypes.string
};
WebSocketClient.defaultProps = {
    topics : ['/topic/musiques/updateClassement'],
    debug : false,
    name : "Unnammed Websocket"
};

export default WebSocketClient;
