import React from "react";
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";

import {playlistManagerPropType} from "../../../types/PlaylistMusiqueType";
import PlaylistManagerActions from "../../../actions/PlaylistManagerActions";
import PlaylistHeader from "../components/PlaylistHeader";
import PlaylistSortableList from "../components/PlaylistSortableList";

class PlaylistContainer extends React.Component {
    constructor(props) {
        super(props);
        this._playMusique = this._playMusique.bind(this);
        this._clearPlaylist = this._clearPlaylist.bind(this);
        this._toggleShuffle = this._toggleShuffle.bind(this);
        this._sortEnd = this._sortEnd.bind(this);
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

                <PlaylistSortableList musiques={ playlistManager.musiques }
                                      musiquePlaying={ musiquePlaying }
                                      playMusique={ this._playMusique }
                                      helperClass='playlistSortableHelper'
                                      onSortEnd={ this._sortEnd }
                />
            </div>
        );
    }

    _playMusique(musique) {
        this.props.playlistManagerActions.playMusique(musique, true);
    }

    _toggleShuffle() {
        this.props.playlistManagerActions.toggleShuffle();
    }

    _clearPlaylist() {
        this.props.playlistManagerActions.clearPlaylist();
    }

    _sortEnd({oldIndex, newIndex}) {
        this.props.playlistManagerActions.reorderPlaylist(oldIndex, newIndex);
    }

}

PlaylistContainer.propTypes = {
    playlistManager: playlistManagerPropType.isRequired
};

export default connect(state => assign({}, {
    playlistManager: state.playlistManager
}), dispatch => ({
    playlistManagerActions: bindActionCreators(PlaylistManagerActions, dispatch)
}))(PlaylistContainer);