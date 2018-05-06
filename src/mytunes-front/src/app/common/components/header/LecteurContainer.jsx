import React from 'react';
import AsideVolumeSlider from "./AsideVolumeSlider";
import {connect} from "react-redux";
import {assign} from "lodash";

import {playlistPropType} from "../../types/PlaylistMusique";
import LecteurDisplay from "./LecteurDisplay";

class LecteurContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            volume : 1,
            currentTime : 0,
            isPlaying : false
        };
        this.audio = null;

        this._updateVolume = this._updateVolume.bind(this);
    }

    componentDidMount() {
        this.audio = document.getElementById('lecteur');
    }

    render() {
        const { volume } = this.state;
        const { playlist } = this.props;
        const musique = playlist.musiquePlaying;
        console.log(musique);

        return (
            <section id="lecteurWrapper">
                <LecteurDisplay musique={ musique } volume={ volume } />
                <AsideVolumeSlider volume={volume}
                                   onVolumeChange={ this._updateVolume } />
            </section>
        );
    }

    _updateVolume(volume) {
        this.setState({...this.state, volume });
    }

}

LecteurContainer.propTypes = {
    playlist : playlistPropType
};

export default connect(state => assign({}, {
    playlist: state.playlist
}), null)(LecteurContainer);