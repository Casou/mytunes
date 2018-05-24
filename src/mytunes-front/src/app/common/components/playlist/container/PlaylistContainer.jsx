import React from "react";
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

import {playlistManagerPropType} from "../../../types/PlaylistMusiqueType";
import PlaylistManagerActions from "../../../actions/PlaylistManagerActions";
import PlaylistHeader from "../components/PlaylistHeader";
import PlaylistSortableList from "../components/PlaylistSortableList";
import {musiquePropType} from "../../../types/MusiqueType";

class PlaylistContainer extends React.Component {

    constructor(props) {
        super(props);
        this._playMusique = this._playMusique.bind(this);
        this._clearPlaylist = this._clearPlaylist.bind(this);
        this._toggleShuffle = this._toggleShuffle.bind(this);
        this._sortEnd = this._sortEnd.bind(this);
        this._changePlaylistName = this._changePlaylistName.bind(this);
    }

    render() {
        const { playlistManager, playlistProvider } = this.props;
        const musiquePlaying = playlistManager.musiquePlaying;

        return (
            <div id="playlistMenu">
                <PlaylistHeader shuffle={ playlistManager.shuffle }
                                onToggleShuffle={ this._toggleShuffle }
                                onClearPlaylist={ this._clearPlaylist }
                                onLoadPlaylist={(playlistId) => this._loadPlaylist(playlistId) }
                                playlistManager={ playlistManager }
                                playlistProvider={ playlistProvider }
                                onChangePlaylistName={ this._changePlaylistName }
                />

                <PlaylistSortableList musiques={ playlistManager.musiques }
                                      musiquePlaying={ musiquePlaying }
                                      playMusique={ this._playMusique }
                                      helperClass='playlistSortableHelper'
                                      onSortEnd={ this._sortEnd }
                                      pressDelay={200}
                />
            </div>
        );
    }

    _playMusique(musique, event) {
        event.preventDefault();
        this.props.playlistManagerActions.playMusique(musique, true);
    }

    _toggleShuffle() {
        this.props.playlistManagerActions.toggleShuffle();
    }

    _clearPlaylist() {
        this.props.playlistManagerActions.clearPlaylist();
    }

    _sortEnd({oldIndex, newIndex}) {
        if (oldIndex === newIndex) {
            return;
        }
        this.props.playlistManagerActions.reorderPlaylist(oldIndex, newIndex);
    }

    _loadPlaylist(playlistId) {
        const playlist = this.props.playlistProvider.getPlaylists().filter(playlist => playlist.id === playlistId)[0];
        this.props.playlistManagerActions.loadPlaylist(playlist, this.props.musiques);
    }

    _changePlaylistName(name) {
        this.props.playlistManagerActions.changePlaylistName(name);
    }

}

PlaylistContainer.propTypes = {
    playlistManager: playlistManagerPropType.isRequired,
    playlistProvider : PropTypes.object.isRequired,
    musiques : PropTypes.arrayOf(musiquePropType)
};

export default connect(state => assign({}, {
    playlistManager: state.playlistManager,
    playlistProvider: state.playlistProvider,
    musiques : state.musiques
}), dispatch => ({
    playlistManagerActions: bindActionCreators(PlaylistManagerActions, dispatch)
}))(PlaylistContainer);