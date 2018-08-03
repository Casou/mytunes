import React from 'react';
import PropTypes from 'prop-types';
import { BottomToolbar, Button, Icon, Range } from 'react-onsenui';
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";
import WebSocketConnectedComponent from "../../../../common/components/websocket/WebSocketConnectedComponent";

import '../../../../../style/components/mobile/footer.css';
import {musiquePropType} from "../../../../common/types/MusiqueType";
import PlaylistManagerActions from "../../../../common/actions/PlaylistManagerActions";

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
        this._seek = this._seek.bind(this);
        this._previousSong = this._previousSong.bind(this);
        this._nextSong = this._nextSong.bind(this);

        this._setComponentName("MobileFooter");
        this._addSubscription("/topic/lecteur/play", (response) => this._playMusiqueCallback(response.musique));
        this._addSubscription("/topic/lecteur/playNextSong", (response) => this._playMusiqueCallback(response.musique));
        this._addSubscription("/topic/lecteur/playPrevSong", (response) => this._playMusiqueCallback(response.musique));
        this._addSubscription("/topic/lecteur/pause", () => this._pauseMusiqueCallback());
        this._addSubscription("/topic/lecteur/time", (response) => this._timerMusiqueCallback(response));
        this._addSubscription("/topic/lecteur/error", (response) => this._errorCallback(response));
    }

    componentDidMount() {
        this._updateMarquee();
    }

    componentDidUpdate() {
        this._updateMarquee();
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);

        if (this.props.musique !== nextProps.musique) {
            this.setState({ ...this.state, musique : nextProps.musique });
        }
    }

    render() {
        const { isPlaying, musique, timer, defileTitle } = this.state;
        const { isLocked } = this.props;

        const disabled = isLocked ? "true" : "";

        return (
            <BottomToolbar aligned={"center"} modifier="material">
                {
                    isPlaying ?
                        <Button modifier="quiet" disabled={disabled}>
                            <Icon icon={"md-pause"} onClick={ this._pauseMusique } />
                        </Button>
                    :
                        <Button modifier="quiet" onClick={ this._playMusique } disabled={disabled}>
                            <Icon icon={"md-play"} />
                        </Button>
                }
                <div id={"bottomPlayerSlider"}>
                    <div id={"playerTitleWrapper"} className={ defileTitle ? "marquee" : "" }>
                        <label id={"playerTitle"}>{ musique ? musique.titre : "Aucun titre" }</label>
                    </div>
                    <Range value={timer}
                           min={0}
                           max={ musique ? musique.duree : 0 }
                           onChange={ (event) => this._seek(event.target.value) }
                           disabled={disabled}
                    />
                </div>
                <Button modifier="quiet" className={"buttonPrev"} disabled={disabled} onClick={ this._previousSong }><Icon icon={"md-skip-previous"} /></Button>
                <Button modifier="quiet" className={"buttonNext"} disabled={disabled} onClick={ this._nextSong }><Icon icon={"md-skip-next"} /></Button>
            </BottomToolbar>
        );
    }

    _updateMarquee() {
        const { defileTitle } = this.state;
        const wrapper = document.getElementById("playerTitleWrapper");
        const label = document.getElementById("playerTitle");

        const defile = wrapper.offsetWidth < label.scrollWidth;
        if (defileTitle !== defile) {
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
        console.log("_playMusiqueCallback");
        const { musique, timer } = this.state;

        this.props.playlistManagerActions.playMusique(newMusique, false);

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

    _seek(time) {
        this.props.wsClient.send("/app/action/lecteur/seekTime", { time });
    }

    _nextSong() {
        this.props.wsClient.send("/app/request/lecteur/playNextSong", {});
    }

    _previousSong() {
        this.props.wsClient.send("/app/request/lecteur/playPrevSong", {});
    }

    _errorCallback(musique) {
        console.error("Error in music", musique);
        this.props.playlistManagerActions.errorMusique(musique);
    }

}

Footer.propTypes = {
    isLocked : PropTypes.bool.isRequired,
    musique : musiquePropType
};

export default connect(state => assign({}, {
    wsClient: state.wsClient
}), dispatch => ({
    playlistManagerActions: bindActionCreators(PlaylistManagerActions, dispatch)
}))(Footer);