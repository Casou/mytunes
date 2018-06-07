import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { __WEBSOCKET_URL__ } from '../../../../App';
import SockJsClient from 'react-stomp';

class WebSocketClient_save extends Component {
  
  constructor(props) {
    super(props);
    this.stompClient = null;
  }
  
  onWsMessage(message) {
    console.log(`[${ this.props.name }] MESSAGE`, message);
  }
  
  onWsConnect() {
      const { onConnect } = this.props;
      if (onConnect) {
          onConnect();
      }
    console.debug(`[${ this.props.name }] CONNECTED`);
  }
  
  onWsDisconnect() {
      console.debug(`[${ this.props.name }] DISCONNECTED`);
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
      console.debug(`[${ this.props.name }] send`, url, payload);
      this.stompClient.sendMessage(url, JSON.stringify(payload));
  }

  subscribeTopic(topic, callback) {
      console.log(this.stompClient);
      this.stompClient.subscribe(topic);
  }
}

WebSocketClient_save.propTypes = {
    topics : PropTypes.array,
    debug : PropTypes.bool,
    name : PropTypes.string,
    onConnect : PropTypes.func
};
WebSocketClient_save.defaultProps = {
    topics : [],
    debug : false,
    name : "Unnammed Websocket"
};

export default WebSocketClient_save;
