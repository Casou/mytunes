import React from "react";
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";

import {playlistManagerPropType} from "../../types/PlaylistMusique";
import PlaylistItem from "./PlaylistItem";
import PlaylistActions from "../../actions/PlaylistActions";
import PlaylistHeader from "./PlaylistHeader";

class PlaylistContainer extends React.Component {
    constructor(props) {
        super(props);
        this._playMusique = this._playMusique.bind(this);
        this._clearPlaylist = this._clearPlaylist.bind(this);
        this._toggleShuffle = this._toggleShuffle.bind(this);
    }

    render() {
        const { playlistManager } = this.props;
        const musiquePlaying = playlistManager.musiquePlaying;

        return (
            <div id="playlistMenu">
                <PlaylistHeader shuffle={ this.props.playlistManager.shuffle }
                                onToggleShuffle={ this._toggleShuffle }
                                onClearPlaylist={ this._clearPlaylist }
                />

                <ul className="playlistMusiqueList">
                    {playlistManager.musiques.map(musique => {
                        return (
                            <PlaylistItem key={"playlist_" + musique.itunesId}
                                          musique={musique}
                                          isPlaying={musique === musiquePlaying}
                                          alreadyPlayed={musique.alreadyPlayed}
                                          playMusique={ this._playMusique }
                            />
                        );
                    })}
                </ul>
            </div>
        );
    }

    _playMusique(musique) {
        this.props.playlistActions.playMusique(musique, true);
    }

    _toggleShuffle() {
        this.props.playlistManager.toggleShuffle();
        this.forceUpdate();
    }

    _clearPlaylist() {
        this.props.playlistManager.clearPlaylist();
        this.forceUpdate();
    }

}

PlaylistContainer.propTypes = {
    playlistManager: playlistManagerPropType.isRequired
};

export default connect(state => assign({}, {
    playlistManager: state.playlistManager
}), dispatch => ({
    playlistActions: bindActionCreators(PlaylistActions, dispatch)
}))(PlaylistContainer);