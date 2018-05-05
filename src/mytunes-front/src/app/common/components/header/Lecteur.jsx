import React from 'react';
import PropTypes from "prop-types";
import { PlayButton, PrevButton, NextButton, ProgressBar, TimeMarker } from "react-player-controls";
import AsideVolumeSlider from "./AsideVolumeSlider";
import { musiquePropType } from "../../../common/types/Musique";

class Lecteur extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            volume : 1,
            currentTime : 0
        }
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
                        <PlayButton
                            isEnabled={ true }
                            onClick={() => console.log('Play!')}
                        />
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
}

Lecteur.propTypes = {
    musique : musiquePropType
};

export default Lecteur;