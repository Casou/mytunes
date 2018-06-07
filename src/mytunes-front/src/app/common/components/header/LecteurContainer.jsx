import React from 'react';
import AsideVolumeSlider from "./AsideVolumeSlider";
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";

import {playlistManagerPropType} from "../../types/PlaylistMusiqueType";
import LecteurDisplay from "./LecteurDisplay";
import PlaylistManagerActions from "../../actions/PlaylistManagerActions";
import WebSocketClient from "../websocket/WebSocketClient";

class LecteurContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            volume : 1,
            currentTime : 0,
            isPlaying : false
        };

        this._updateVolume = this._updateVolume.bind(this);
        this._playNextSong = this._playNextSong.bind(this);
        this._playPrevSong = this._playPrevSong.bind(this);
        this._songError = this._songError.bind(this);
        this._onPlaySong = this._onPlaySong.bind(this);
        this._onPauseSong = this._onPauseSong.bind(this);
        this._onUpdatePlayTime = this._onUpdatePlayTime.bind(this);

        this.wsClient = null;
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
                                onSongEnd={ this._playNextSong }
                                onSongError={ this._songError }
                                onPlaySong={ this._onPlaySong }
                                onUpdatePlayTime={ this._onUpdatePlayTime }
                                wsClient={ this.wsClient }
                />
                <AsideVolumeSlider volume={volume}
                                   onVolumeChange={ this._updateVolume } />
                <WebSocketClient ref={ (instance) => { this.wsClient = instance }}
                                 topics={['/topic/lecteur/play', '/topic/lecteur/time']} />
            </section>
        );
    }

    _updateVolume(volume) {
        this.setState({...this.state, volume });
    }

    _onPlaySong(musique) {
        if (this.wsClient) {
            this.wsClient.send("/app/action/lecteur/play", musique);
        }
    }
    _onPauseSong() {
        if (this.wsClient) {
            this.wsClient.send("/app/action/lecteur/pause", {});
        }
    }

    _onUpdatePlayTime(time) {
        if (this.wsClient) {
            this.wsClient.send("/app/action/lecteur/updateTime", { time });
        }
    }

    _playNextSong() {
        const nextSong = this.props.playlistManager.getNextSong();
        if (nextSong) {
            this.props.playlistManagerActions.playMusique(nextSong, true);
        } else {
            this.props.playlistManagerActions.clearMusique();
        }
    }

    _playPrevSong() {
        const prevSong = this.props.playlistManager.getPrevSong();
        if (prevSong) {
            this.props.playlistManagerActions.playMusique(prevSong, false);
        }
    }

    _songError(musique) {
        this.props.playlistManagerActions.errorMusique(musique);
    }

}

LecteurContainer.propTypes = {
    playlistManager : playlistManagerPropType
};

export default connect(state => assign({}, {
    playlistManager: state.playlistManager
}), dispatch => ({
    playlistManagerActions: bindActionCreators(PlaylistManagerActions, dispatch)
}))(LecteurContainer);