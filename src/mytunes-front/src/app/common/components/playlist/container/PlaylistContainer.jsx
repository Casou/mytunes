import React from "react";
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {arrayMove} from 'react-sortable-hoc';

import {playlistManagerPropType} from "../../../types/PlaylistMusiqueType";
import PlaylistManagerActions from "../../../actions/PlaylistManagerActions";
import PlaylistHeader from "../components/PlaylistHeader";
import PlaylistSortableList from "../components/PlaylistSortableList";
import {musiquePropType} from "../../../types/MusiqueType";
import PlaylistsActions from "../../../../pages/savedPlaylists/actions/PlaylistsActions";
import LoadingActions from "../../../actions/LoadingActions";
import WebSocketConnectedComponent from "../../websocket/WebSocketConnectedComponent";

class PlaylistContainer extends WebSocketConnectedComponent {

    constructor(props) {
        super(props);
        this._playMusique = this._playMusique.bind(this);
        this._clearPlaylist = this._clearPlaylist.bind(this);
        this._toggleShuffle = this._toggleShuffle.bind(this);
        this._sortEnd = this._sortEnd.bind(this);
        this._changePlaylistName = this._changePlaylistName.bind(this);
        this._newPlaylist = this._newPlaylist.bind(this);

        this._setComponentName("PlaylistContainer");
        this._addSubscription("/topic/lecteur/play", (response) => this._playMusiqueCallback(response.musique));
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
                                onSavePlaylist={(playlistProperties) => this._savePlaylist(playlistProperties) }
                                onNewPlaylist={ this._newPlaylist }
                                playlistManager={ playlistManager }
                                playlistProvider={ playlistProvider }
                                onChangePlaylistName={ this._changePlaylistName }
                />

                <PlaylistSortableList musiques={ playlistManager.musiques }
                                      musiquePlaying={ musiquePlaying }
                                      playMusique={ this._playMusique }
                                      deleteMusique={ this._deleteMusique }
                                      helperClass='playlistSortableHelper'
                                      onSortEnd={ this._sortEnd }
                                      pressDelay={200}
                />
            </div>
        );
    }

    _playMusique(musique, event) {
        event.preventDefault();
        this.props.wsClient.send("/app/action/lecteur/play", musique);
    }

    _playMusiqueCallback(musique) {
        this.props.playlistManagerActions.playMusique(musique, true);
    }

    _toggleShuffle() {
        this.props.playlistManagerActions.toggleShuffle();
    }

    _deleteMusique(musique, event) {
        event.preventDefault();
        alert("TODO");
    }
    _clearPlaylist() {
        this.props.playlistManagerActions.clearPlaylist(this.props.playlistManager.playlist);
    }
    _newPlaylist() {
        this.props.playlistManagerActions.newPlaylist();
    }

    _sortEnd({oldIndex, newIndex}) {
        if (oldIndex === newIndex) {
            return;
        }

        if (this.props.playlistManager.playlist) {
            this.props.playlistsActions.updateMusiqueOrder(this.props.playlistManager.playlist,
                arrayMove(this.props.playlistManager.musiques, oldIndex, newIndex));
        }

        this.props.playlistManagerActions.reorderPlaylist(oldIndex, newIndex);
    }

    _loadPlaylist(playlistId) {
        const playlist = this.props.playlistProvider.getPlaylists().filter(playlist => playlist.id === playlistId)[0];
        this.props.playlistManagerActions.loadPlaylist(playlist, this.props.musiques);
    }

    _changePlaylistName(name) {
        this.props.playlistsActions.updatePlaylistNom(this.props.playlistManager.playlist.id, name);
        this.props.playlistManagerActions.changePlaylistName(name);
    }

    _savePlaylist(playlistProperties) {
        this.props.loadingActions.setIsGeneralLoading(true);

        const playlist = this.props.playlistManager.playlist;
        const playlistToSave = {
            id : playlist ? playlist.id : null,
            nom : playlistProperties.playlistName,
            parentId : playlistProperties.playlistParentId > 0 ? playlistProperties.playlistParentId : null,
            musiqueIds : this.props.playlistManager.musiques.map(musique => musique.id)
        };
        return this.props.playlistsActions.savePlaylist(playlistToSave).then(playlist => {
            if (!playlistToSave.id || playlist.id !== playlistToSave.id) {
                this.props.playlistManagerActions.setPlaylist(playlist);
            }
            this.props.loadingActions.setIsGeneralLoading(false);
        });
    }

}

PlaylistContainer.propTypes = {
    playlistManager: playlistManagerPropType.isRequired,
    playlistProvider : PropTypes.object.isRequired,
    musiques : PropTypes.arrayOf(musiquePropType),
    wsClient : PropTypes.object
};

export default connect(state => assign({}, {
    playlistManager: state.playlistManager,
    playlistProvider: state.playlistProvider,
    musiques : state.musiques,
    wsClient : state.wsClient
}), dispatch => ({
    playlistManagerActions: bindActionCreators(PlaylistManagerActions, dispatch),
    playlistsActions: bindActionCreators(PlaylistsActions, dispatch),
    loadingActions: bindActionCreators(LoadingActions, dispatch)
}))(PlaylistContainer);