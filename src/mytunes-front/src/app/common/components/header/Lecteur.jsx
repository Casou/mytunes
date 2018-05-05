import React from 'react';
import { PlayButton, PrevButton, NextButton, ProgressBar, TimeMarker, PauseButton } from "react-player-controls";
import AsideVolumeSlider from "./AsideVolumeSlider";
import { musiquePropType } from "../../../common/types/Musique";

class Lecteur extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            volume : 1,
            currentTime : 0,
            isPlaying : false
        };
        this.audio = null;
    }

    componentDidMount() {
        this.audio = document.getElementById('lecteur');
    }

    render() {
        return (
            <section id="lecteurWrapper">
                <div id="lecteurDiv">
                    <div id="lecteurAction">
                        <PrevButton
                            isEnabled={ true }
                            onClick={() => console.log('Prev!')}
                        />
                        {
                            this.state.isPlaying ?
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
                        <h1>{ this.props.musique ? this.props.musique.titre : "Aucun titre" }</h1>
                        <h2>{ this.props.musique && this.props.musique.artiste ?
                            this.props.musique.artiste :
                            "Aucun artiste" }
                        </h2>
                        <div id="lecteurProgress">
                            <ProgressBar
                                totalTime={ this.props.musique ? this.props.musique.duree : 0 }
                                currentTime={ this.state.currentTime }
                                bufferedTime={ 15 }
                                isSeekable={ true }
                                onSeek={time => this._seek(time)}
                                onSeekStart={time => null }
                                onSeekEnd={time => null }
                                onIntent={time => null }
                            />
                            <TimeMarker
                                totalTime={ this.props.musique ? this.props.musique.duree : 0 }
                                currentTime={ this.state.currentTime }
                                markerSeparator={ "/" }
                                firstMarkerType={ "ELAPSED" }
                                secondMarkerType={ "DURATION" }
                            />
                        </div>
                    </div>
                </div>
                <audio id={"lecteur"}>
                    {
                        this.props.musique ?
                        <source src={ this.props.musique.path } type="audio/mp3"/>
                        :
                        ""
                    }
                </audio>
                <AsideVolumeSlider volume={this.state.volume}
                                   onVolumeChange={(volume) => this.setState({...this.state, volume }) } />
            </section>
        );
    }

    _seek(time) {
        console.log("seek", time);
        this.setState({
            ...this.state,
            currentTime : time
        });
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

Lecteur.propTypes = {
    musique : musiquePropType
};

export default Lecteur;