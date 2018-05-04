import React from "react";
import PropTypes from "prop-types";
import { VolumeSlider } from "react-player-controls";

import '../../../../style/components/volumeSlide.css';
import '../../../../style/components/progressBar.css';

const AsideVolumeSlider = props => (
    <aside id={"volumeSlider"}>
        <VolumeSlider
            direction={ "VERTICAL" }
            volume={ props.volume }
            isEnabled={ true }
            onVolumeChange={ volume => props.onVolumeChange(volume) }
        />
    </aside>
);

AsideVolumeSlider.propTypes = {
    volume : PropTypes.number.isRequired,
    onVolumeChange : PropTypes.func.isRequired
};

export default AsideVolumeSlider;