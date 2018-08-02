import React from 'react';
import {connect} from "react-redux";
import {assign} from "lodash";
import PropTypes from 'prop-types';

import '../../../../../style/components/mobile/volumeSlider.css';

class VolumeSlider extends React.Component {

    constructor(props) {
        super(props);
        this._updateVolume = this._updateVolume.bind(this);
    }

    render() {
        return (
            <section id={"volumeSlider"}>
                <div className="rangeSlider">
                    <input type={"range"}
                           orient="vertical"
                           min={0} max={1}
                           step="0.05"
                           value={this.props.volume}
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

}

VolumeSlider.propTypes = {
    isLocked : PropTypes.bool.isRequired,
    volume : PropTypes.number
};

VolumeSlider.defaultProps = {
    volume : 1
};

export default connect(state => assign({}, {
    wsClient: state.wsClient
}), null)(VolumeSlider);