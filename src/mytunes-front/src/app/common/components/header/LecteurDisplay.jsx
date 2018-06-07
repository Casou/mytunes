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

        this._play = this._play.bind(this);
        this._pause = this._pause.bind(this);
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
        if (this.props.musique !== nextProps.musique) {
            this._pause();
            if (nextProps.musique) {
                this.audioSource.src = __SERVER_URL__ + nextProps.musique.path;
                this.audio.load();
                this._play();
            }
        }
        if (this.props.volume !== nextProps.volume) {
            this.audio.volume = nextProps.volume;
        }
    }

    render() {
        const { isPlaying, currentTime } = this.state;
        const { musique, onSongEnd } = this.props;

        return (
            <div id="lecteurDiv">
                <div id="lecteurAction">
                    <PrevButton
                        isEnabled={ this.props.musique ? true : false }
                        onClick={ this.props.playPrevSong }
                    />
                    {
                        isPlaying ?
                        <PauseButton
                            isEnabled={ this.props.musique ? true : false }
                            onClick={() => this._pause() }
                        />
                        :
                        <PlayButton
                            isEnabled={ this.props.musique ? true : false }
                            onClick={() => this._play() }
                        />
                    }

                    <NextButton
                        isEnabled={ this.props.musique ? true : false }
                        onClick={ this.props.playNextSong }
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
                    <source id="lecteurSource" src=""></source>
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

        this.setState({
            ...this.state,
            currentTime : time
        });
    }

    _seek(time) {
        this.audio.currentTime = time;
        this._updateCurrentTime(time);
    }

    _play() {
        const { onPlaySong, musique } = this.props;

        if (onPlaySong) {
            onPlaySong(musique);
        }

        this.audio.play();
        this.setState({
            ...this.state,
            isPlaying : true
        });
    }

    _pause() {
        this.audio.pause();
        this.setState({
            ...this.state,
            isPlaying : false
        });
    }

    _loadingError(e) {
        const { musique, playNextSong, onSongError } = this.props;
        if (musique) {
            NotificationManager.error("Erreur lors du chargement de la chanson " + musique.titre);
            console.error("Erreur lors du chargement de la chanson '" + musique.titre + "'");
            onSongError(musique);
            playNextSong();
        }
    }

}

LecteurDisplay.propTypes = {
    musique : musiquePropType,
    volume : PropTypes.number.isRequired,
    onSongEnd : PropTypes.func.isRequired,
    onSongError : PropTypes.func.isRequired,
    playNextSong : PropTypes.func.isRequired,
    playPrevSong : PropTypes.func.isRequired,
    onPlaySong : PropTypes.func,
    onUpdatePlayTime : PropTypes.func,
    wsClient : PropTypes.object
};

export default LecteurDisplay;