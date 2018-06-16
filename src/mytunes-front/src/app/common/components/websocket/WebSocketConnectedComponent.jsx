import React from 'react';
import PropTypes from 'prop-types'

class WebSocketConnectedComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.componentWSName = null;
        this.subscriptions = new Map();
    }

    componentWillMount() {
        if (!this.componentWSName) {
            throw new Error("You have to initialize component name (componentWSName) for WebSocketConnectedComponent inheritance.");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.wsClient !== nextProps.wsClient && nextProps.wsClient) {
            this.subscriptions.forEach((callback, topic) => {
                nextProps.wsClient.subscribe(topic, this.componentWSName, (response) => callback(response));
            });
        }
    }

    componentWillUnmount() {
        if (this.props.wsClient) {
            this.subscriptions.forEach((callback, topic ) => {
                this.props.wsClient.unsubscribe(topic, this.componentWSName);
            });
        }
    }

    render() {
        return (<div>No Render</div>);
    }

    _setComponentName(componentName) {
        this.componentWSName = componentName;
    }

    _addSubscription(topic, callback) {
        this.subscriptions.set(topic, callback);
    }
}

WebSocketConnectedComponent.propTypes = {
    wsClient: PropTypes.object.isRequired
};

export default WebSocketConnectedComponent;