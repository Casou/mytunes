import React from 'react';
import { PlayButton, PrevButton, NextButton, ProgressBar, TimeMarker, PauseButton } from "react-player-controls";
import PropTypes from "prop-types";
import { NotificationManager } from "react-notifications";

import {musiquePropType} from "../../types/MusiqueType";
import {__SERVER_URL__} from "../../../../App";

class LecteurDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTime : 0,
            isPlaying : false
        };
        this.audio = null;
        this.audioSource = null;

        this._playWS = this._playWS.bind(this);
        this._pauseWS = this._pauseWS.bind(this);
        this._seek = this._seek.bind(this);
        this._updateTime = this._updateTime.bind(this);
        this._updateCurrentTime = this._updateCurrentTime.bind(this);
        this._loadingError = this._loadingError.bind(this);
    }

    componentDidMount() {
        this.audio = document.getElementById('lecteur');
        this.audioSource = document.getElementById('lecteurSource');
        this.audioSource.addEventListener("error", this._loadingError);

    }

    componentWillReceiveProps(nextProps) {
        if ((!this.props.musique && nextProps.musique) ||
                (this.props.musique && nextProps.musique &&
                    this.props.musique.uniqueId !== nextProps.musique.uniqueId)
            ) {
            this._load(nextProps.musique);
        }
        if (this.props.volume !== nextProps.volume) {
            this.audio.volume = nextProps.volume;
        }
        if (this.props.wsClient !== nextProps.wsClient && nextProps.wsClient) {
            nextProps.wsClient.subscribe("/topic/lecteur/play", "LecteurDisplay", () => this._playCallback(false));
            nextProps.wsClient.subscribe("/topic/lecteur/pause", "LecteurDisplay", () => this._pauseCallback());
            nextProps.wsClient.subscribe("/topic/lecteur/time", "LecteurDisplay", (response) => this._updateCurrentTimeCallback(response.time));
            nextProps.wsClient.subscribe("/topic/lecteur/seek", "LecteurDisplay", (response) => this._seek(response.time, false));

            nextProps.wsClient.send("/app/action/lecteur/pause", nextProps.musique);
        }
    }


    render() {
        const { isPlaying, currentTime } = this.state;
        const { musique, onSongEnd, disabled } = this.props;

        return (
            <div id="lecteurDiv">
                <div id="lecteurAction">
                    <PrevButton
                        isEnabled={ this.props.musique ? true : false }
                        onClick={ this.props.playPrevSong }
                        disabled={disabled}
                    />
                    {
                        isPlaying ?
                        <PauseButton
                            isEnabled={ this.props.musique ? true : false }
                            onClick={() => this._pauseWS() }
                            disabled={disabled}
                        />
                        :
                        <PlayButton
                            isEnabled={ this.props.musique ? true : false }
                            onClick={() => this._playWS() }
                            disabled={disabled}
                        />
                    }

                    <NextButton
                        isEnabled={ this.props.musique ? true : false }
                        onClick={ this.props.onPlayNextSong }
                        disabled={disabled}
                    />
                </div>
                <div id="lecteurDisplay">
                    <h1>{ musique ? musique.titre : "Aucun titre" }</h1>
                    <h2>{ musique && musique.artiste ?
                        musique.artiste :
                        "Aucun artiste" }
                    </h2>
                    <div id="lecteurProgress">
                        <ProgressBar
                            totalTime={ musique ? musique.duree : 0 }
                            currentTime={ currentTime }
                            bufferedTime={ 15 }
                            isSeekable={ true }
                            onSeek={time => this._seek(time)}
                            onSeekStart={time => null }
                            onSeekEnd={time => null }
                            onIntent={time => null }
                            disabled={disabled}
                        />
                        <TimeMarker
                            totalTime={ musique ? musique.duree : 0 }
                            currentTime={ currentTime }
                            markerSeparator={ "/" }
                            firstMarkerType={ "ELAPSED" }
                            secondMarkerType={ "DURATION" }
                        />
                    </div>
                </div>

                <audio id="lecteur" onTimeUpdate={ this._updateTime } onEnded={ onSongEnd }>
                    <source id="lecteurSource" src={ musique && __SERVER_URL__ + musique.path } ></source>
                </audio>
            </div>
        );
    }

    _updateTime() {
        this._updateCurrentTime(this.audio.currentTime);
    }

    _updateCurrentTime(time) {
        const { onUpdatePlayTime } = this.props;

        if (onUpdatePlayTime) {
            onUpdatePlayTime(time);
        }
    }

    _updateCurrentTimeCallback(time) {
        this.setState({
            ...this.state,
            currentTime : time
        });
    }

    _seek(time) {
        this.audio.currentTime = time;
        this._updateCurrentTime(time);
    }

    _load(musique) {
        this._pauseCallback();
        if (musique) {
            this.audioSource.src = __SERVER_URL__ + musique.path;
            this.audio.load();
            this._playCallback(false);
        }
    }

    _playWS() {
        const { onPlaySong, musique } = this.props;

        if (onPlaySong) {
            onPlaySong(musique);
        }
    }

    _playCallback() {
        this.audio.play();
        this.setState({
            ...this.state,
            isPlaying : true
        });
    }

    _pauseWS() {
        const { onPauseSong } = this.props;

        if (onPauseSong) {
            onPauseSong();
        }
    }

    _pauseCallback() {
        const isPlaying = this.audio.currentTime > 0 && !this.audio.paused && !this.audio.ended
            && this.audio.readyState > 2;
        if (!isPlaying) {
            return;
        }

        this.audio.pause();
        this.setState({
            ...this.state,
            isPlaying : false
        });
    }

    _loadingError(e) {
        const { musique, onPlayNextSong, onSongError } = this.props;
        if (musique) {
            NotificationManager.error("Erreur lors du chargement de la chanson " + musique.titre);
            console.error("Erreur lors du chargement de la chanson '" + musique.titre + "'", musique.path);
            onSongError(musique);
            onPlayNextSong();
        }
    }

}

LecteurDisplay.propTypes = {
    musique : musiquePropType,
    volume : PropTypes.number.isRequired,
    onSongEnd : PropTypes.func.isRequired,
    onSongError : PropTypes.func.isRequired,
    onPlayNextSong : PropTypes.func.isRequired,
    playPrevSong : PropTypes.func.isRequired,
    onPlaySong : PropTypes.func,
    onPauseSong : PropTypes.func,
    onUpdatePlayTime : PropTypes.func,
    wsClient : PropTypes.object,
    disabled : PropTypes.bool.isRequired
};

LecteurDisplay.defaultProps = {
    disabled : false
};

export default LecteurDisplay;