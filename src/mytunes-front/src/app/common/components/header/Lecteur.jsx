import React from 'react';
import PropTypes from "prop-types";
import { PlayButton, PrevButton, NextButton } from "react-player-controls";
import AsideVolumeSlider from "./AsideVolumeSlider";

class Lecteur extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            volume : 1
        }
    }

    render() {
        return (
            <section id="lecteurWrapper">
                <div id="lecteurDiv">
                    <div id="lecteurAction">
                        <PrevButton
                            id={"prevButton"}
                            isEnabled={ true }
                            onClick={() => console.log('Prev!')}
                        />
                        <PlayButton
                            id={"playButton"}
                            isEnabled={ true }
                            onClick={() => console.log('Play!')}
                        />
                        <NextButton
                            id={"nextButton"}
                            isEnabled={ true }
                            onClick={() => console.log('Next!')}
                        />
                    </div>
                    <div id="lecteurDisplay">
                        <h1>{ this.props.titre ? this.props.titre : "Aucun titre" }</h1>
                        <h2>{ this.props.artiste ? this.props.artiste : "Aucun artiste" }</h2>
                    </div>
                </div>
                <AsideVolumeSlider volume={this.state.volume}
                                   onVolumeChange={(volume) => this.setState({...this.state, volume }) } />
            </section>
        );
    }

}

Lecteur.propTypes = {
  titre:PropTypes.string,
  artiste:PropTypes.string
};

export default Lecteur;