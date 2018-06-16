import React from 'react';
import PropTypes from 'prop-types';

const VolumeSlider = (props) => (
    <section id={"volumeSlider"}>
        <div className="rangeSlider">
            <input type={"range"} orient="vertical" min={0} max={100} defaultValue={75} />
        </div>
    </section>
);

VolumeSlider.propTypes = {};
VolumeSlider.defaultProps = {};

export default VolumeSlider;