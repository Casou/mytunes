import React from 'react';
import { PlayButton, PrevButton, NextButton, ProgressBar, TimeMarker, PauseButton } from "react-player-controls";
import PropTypes from "prop-types";

import {musiquePropType} from "../../types/Musique";
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
    }

    componentDidMount() {
        this.audio = document.getElementById('lecteur');
        this.audioSource = document.getElementById('lecteurSource');
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.musique !== nextProps.musique) {
            console.log("change musique");
            this._pause();
            this.audioSource.src = __SERVER_URL__ + nextProps.musique.path;
            this.audio.load();
            this._play();
        }
        if (this.props.volume !== nextProps.volume) {
            this.audio.volume = nextProps.volume;
        }
    }

    render() {
        const { isPlaying, currentTime } = this.state;
        const { musique } = this.props;

        return (
            <div id="lecteurDiv">
                <div id="lecteurAction">
                    <PrevButton
                        isEnabled={ true }
                        onClick={() => console.log('Prev!')}
                    />
                    {
                        isPlaying ?
                        <PauseButton
                            isEnabled={ true }
                            onClick={() => this._pause() }
                        />
                        :
                        <PlayButton
                            isEnabled={ true }
                            onClick={() => this._play() }
                        />
                    }

                    <NextButton
                        isEnabled={ true }
                        onClick={() => console.log('Next!')}
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

                <audio id="lecteur" onTimeUpdate={ this._updateTime }>
                    <source id="lecteurSource" src=""></source>
                </audio>
            </div>
        );
    }

    _updateTime() {
        this._updateCurrentTime(this.audio.currentTime);
    }

    _updateCurrentTime(time) {
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

}

LecteurDisplay.propTypes = {
    musique : musiquePropType,
    volume : PropTypes.number.isRequired
};

export default LecteurDisplay;