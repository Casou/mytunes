import React from 'react';
import {connect} from "react-redux";
import {assign} from "lodash";
import WebSocketConnectedComponent from "../../../../common/components/websocket/WebSocketConnectedComponent";
import PropTypes from 'prop-types';

import '../../../../../style/components/mobile/volumeSlider.css';

class VolumeSlider extends WebSocketConnectedComponent {

    state = {
        volume : 0.25
    };

    constructor(props) {
        super(props);

        this._setComponentName("VolumeSlider");
        this._addSubscription("/topic/lecteur/volume", (response) => this._updateVolumeCallback(response.volume));

        this._updateVolume = this._updateVolume.bind(this);
        this._updateVolumeCallback = this._updateVolumeCallback.bind(this);
    }

    render() {
        return (
            <section id={"volumeSlider"}>
                <div className="rangeSlider">
                    <input type={"range"}
                           orient="vertical"
                           min={0} max={1}
                           step="0.01"
                           value={this.state.volume}
                           onChange={this._updateVolume}
                           disabled={this.props.isLocked}
                    />
                </div>
            </section>
        );
    }

    _updateVolume(event) {
        this.props.wsClient.send("/app/action/lecteur/updateVolume", { volume : event.target.value });
    }

    _updateVolumeCallback(volume) {
        this.setState({
            ...this.state,
            volume
        });
    }
}

VolumeSlider.propTypes = {
    isLocked : PropTypes.bool.isRequired
};

export default connect(state => assign({}, {
    wsClient: state.wsClient
}), null)(VolumeSlider);