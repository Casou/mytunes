import React from 'react';
import AsideVolumeSlider from "./AsideVolumeSlider";
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";

import {playlistManagerPropType} from "../../types/PlaylistMusiqueType";
import LecteurDisplay from "./LecteurDisplay";
import PlaylistManagerActions from "../../actions/PlaylistManagerActions";

class LecteurContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            volume : 25,
            currentTime : 0,
            isPlaying : false
        };

        this._updateVolume = this._updateVolume.bind(this);
        this._updateVolumeCallback = this._updateVolumeCallback.bind(this);
        this._playNextSongWS = this._playNextSongWS.bind(this);
        this._playNextSongCallback = this._playNextSongCallback.bind(this);
        this._playPrevSongWS = this._playPrevSongWS.bind(this);
        this._playPrevSongCallback = this._playPrevSongCallback.bind(this);
        this._songError = this._songError.bind(this);
        this._onPlaySong = this._onPlaySong.bind(this);
        this._onPauseSong = this._onPauseSong.bind(this);
        this._onUpdatePlayTime = this._onUpdatePlayTime.bind(this);
        this._onSeekPlayTime = this._onSeekPlayTime.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.wsClient !== nextProps.wsClient && nextProps.wsClient) {
            nextProps.wsClient.subscribe("/topic/lecteur/playNextSong", "LecteurContainer", (response) => this._playNextSongCallback(response.musique));
            nextProps.wsClient.subscribe("/topic/lecteur/playPrevSong", "LecteurContainer", (response) => this._playPrevSongCallback(response.musique));
            nextProps.wsClient.subscribe("/topic/lecteur/volume", "LecteurContainer", (response) => this._updateVolumeCallback(response.volume));
        }
    }

    render() {
        const { volume } = this.state;
        const { playlistManager } = this.props;
        const musique = playlistManager.musiquePlaying;

        return (
            <section id="lecteurWrapper">
                <LecteurDisplay musique={ musique }
                                volume={ volume }
                                onPlayNextSong={ this._playNextSongWS }
                                playPrevSong={ this._playPrevSongWS }
                                onSongEnd={ this._playNextSongWS }
                                onSongError={ this._songError }
                                onPlaySong={ this._onPlaySong }
                                onPauseSong={ this._onPauseSong }
                                onUpdatePlayTime={ this._onUpdatePlayTime }
                                onSeekTime ={ this._onSeekPlayTime }
                                wsClient={ this.props.wsClient }
                />
                <AsideVolumeSlider volume={volume}
                                   onVolumeChange={ this._updateVolume } />
            </section>
        );
    }

    _updateVolume(volume) {
        if (this.props.wsClient) {
            this.props.wsClient.send("/app/action/lecteur/updateVolume", { volume });
        }
    }

    _updateVolumeCallback(volume) {
        this.setState({...this.state, volume });
    }

    _onPlaySong(musique) {
        if (this.props.wsClient) {
            this.props.wsClient.send("/app/action/lecteur/play", musique);
        }
    }
    _onPauseSong() {
        if (this.props.wsClient) {
            this.props.wsClient.send("/app/action/lecteur/pause", {});
        }
    }

    _onUpdatePlayTime(time) {
        if (this.props.wsClient) {
            this.props.wsClient.send("/app/action/lecteur/updateTime", { time });
        }
    }

    _onSeekPlayTime(time) {
        if (this.props.wsClient) {
            this.props.wsClient.send("/app/action/lecteur/seekTime", { time });
        }
    }


    _playNextSongWS() {
        if (this.props.wsClient) {
            const nextSong = this.props.playlistManager.getNextSong();
            this.props.wsClient.send("/app/action/lecteur/playNextSong", { musique : nextSong });
        }
    }

    _playNextSongCallback(nextSong) {
        if (nextSong) {
            this.props.playlistManagerActions.playMusique(nextSong, true);
        } else {
            this.props.playlistManagerActions.clearMusique();
        }
    }

    _playPrevSongWS() {
        if (this.props.wsClient) {
            const prevSong = this.props.playlistManager.getPrevSong();
            this.props.wsClient.send("/app/action/lecteur/playPrevSong", { musique : prevSong });
        }
    }

    _playPrevSongCallback(prevSong) {
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
    playlistManager: state.playlistManager,
    wsClient: state.wsClient
}), dispatch => ({
    playlistManagerActions: bindActionCreators(PlaylistManagerActions, dispatch)
}))(LecteurContainer);