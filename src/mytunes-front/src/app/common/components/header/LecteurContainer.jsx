import React from 'react';
import AsideVolumeSlider from "./AsideVolumeSlider";
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";

import {playlistManagerPropType} from "../../types/PlaylistMusique";
import LecteurDisplay from "./LecteurDisplay";
import PlaylistActions from "../../actions/PlaylistActions";

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
        this._playNextSong = this._playNextSong.bind(this);
        this._playPrevSong = this._playPrevSong.bind(this);
    }

    componentDidMount() {
        this.audio = document.getElementById('lecteur');
    }

    render() {
        const { volume } = this.state;
        const { playlistManager } = this.props;
        const musique = playlistManager.musiquePlaying;

        return (
            <section id="lecteurWrapper">
                <LecteurDisplay musique={ musique }
                                volume={ volume }
                                playNextSong={ this._playNextSong }
                                playPrevSong={ this._playPrevSong }
                                onSongEnd={ this._playNextSong } />
                <AsideVolumeSlider volume={volume}
                                   onVolumeChange={ this._updateVolume } />
            </section>
        );
    }

    _updateVolume(volume) {
        this.setState({...this.state, volume });
    }

    _playNextSong() {
        const nextSong = this.props.playlistManager.getNextSong();
        this.props.playlistActions.playMusique(nextSong);
    }

    _playPrevSong() {
        const prevSong = this.props.playlistManager.getPrevSong();
        this.props.playlistActions.playMusique(prevSong);
    }

}

LecteurContainer.propTypes = {
    playlistManager : playlistManagerPropType
};

export default connect(state => assign({}, {
    playlistManager: state.playlistManager
}), dispatch => ({
    playlistActions: bindActionCreators(PlaylistActions, dispatch)
}))(LecteurContainer);