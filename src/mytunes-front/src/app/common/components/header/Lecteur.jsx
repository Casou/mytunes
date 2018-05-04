import React from 'react';
import PropTypes from "prop-types";
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
            <section className="lecteur">
                <div className="lecteurDiv">
                    <h1>{ this.props.titre ? this.props.titre : "Aucun titre" }</h1>
                    <h2>{ this.props.artiste ? this.props.artiste : "-" }</h2>
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