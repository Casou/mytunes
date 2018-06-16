import React from 'react';
import PropTypes from 'prop-types';
import { BottomToolbar, Button, Icon, Range } from 'react-onsenui';
import {connect} from "react-redux";
import {assign} from "lodash";
import WebSocketConnectedComponent from "../../../../common/components/websocket/WebSocketConnectedComponent";

import '../../../../../style/components/mobile/footer.css';

class Footer extends WebSocketConnectedComponent {

    state = {
        isPlaying : false,
        musique : null,
        timer : 0,
        defileTitle : false
    };

    constructor(props) {
        super(props);

        this._playMusique = this._playMusique.bind(this);
        this._pauseMusique = this._pauseMusique.bind(this);

        this._setComponentName("MobileFooter");
        this._addSubscription("/topic/lecteur/play", (response) => this._playMusiqueCallback(response.musique));
        this._addSubscription("/topic/lecteur/pause", () => this._pauseMusiqueCallback());
        this._addSubscription("/topic/lecteur/time", (response) => this._timerMusiqueCallback(response));
    }

    componentDidMount() {
        this._updateMarquee();
    }

    componentDidUpdate() {
        this._updateMarquee();
    }

    render() {
        const { isPlaying, musique, timer, defileTitle } = this.state;

        return (
            <BottomToolbar aligned={"center"} modifier="material">
                {
                    isPlaying ?
                        <Button modifier="quiet">
                            <Icon icon={"md-pause"} onClick={ this._pauseMusique } />
                        </Button>
                    :
                        <Button modifier="quiet" onClick={ this._playMusique }>
                            <Icon icon={"md-play"} />
                        </Button>
                }
                <div id={"bottomPlayerSlider"}>
                    <div id={"playerTitleWrapper"} className={ defileTitle ? "marquee" : "" }>
                        <label id={"playerTitle"}>{ musique ? musique.titre : "-" }</label>
                    </div>
                    <Range value={timer} min={0} max={ musique ? musique.duree : 0 } />
                </div>
                <Button modifier="quiet" className={"buttonPrev"}><Icon icon={"md-skip-previous"} /></Button>
                <Button modifier="quiet" className={"buttonNext"}><Icon icon={"md-skip-next"} /></Button>
            </BottomToolbar>
        );
    }

    _updateMarquee() {
        const { defileTitle } = this.state;
        const wrapper = document.getElementById("playerTitleWrapper");
        const label = document.getElementById("playerTitle");

        const defile = wrapper.offsetWidth < label.scrollWidth;
        if (defileTitle != defile) {
            this.setState({
                ...this.state,
                defileTitle: defile
            });
        }
    }

    _playMusique() {
        const { musique } = this.state;
        this.props.wsClient.send("/app/action/lecteur/play", musique);
    }

    _playMusiqueCallback(newMusique) {
        const { musique, timer } = this.state;

        this.setState({
            ...this.state,
            musique: newMusique,
            isPlaying: true,
            timer : musique && musique.uniqueId === newMusique.uniqueId ? timer : 0
        });
    }

    _pauseMusique() {
        this.props.wsClient.send("/app/action/lecteur/pause", {});
    }

    _pauseMusiqueCallback() {
        this.setState({
            ...this.state,
            isPlaying: false
        });
    }

    _timerMusiqueCallback(response) {
        this.setState({
            ...this.state,
            timer: response.time
        });
    }
}

Footer.propTypes = {};

export default connect(state => assign({}, {
    wsClient: state.wsClient
}), null)(Footer);