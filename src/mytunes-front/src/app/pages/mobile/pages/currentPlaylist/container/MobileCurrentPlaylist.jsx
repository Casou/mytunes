import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {assign} from "lodash";
import {bindActionCreators} from "redux";
import PlaylistSortableList from "../../../../../common/components/playlist/components/PlaylistSortableList";

import '../../../../../../style/components/playlistMenu.css';
import '../style/MobileCurrentPlaylist.css';
import ConfirmDialog from "../../../common/components/ConfirmDialog";
import PlaylistManagerActions from "../../../../../common/actions/PlaylistManagerActions";


const MobileCurrentPlaylist = ({playlistManager, wsClient, disableButtons, playlistManagerActions}) => {
    const deleteMusique = (musique) => {
        this.confirmDelete.openDialog(musique);
    };
    const playMusique = (musique) => {
        this.confirmPlay.openDialog(musique);
    };
    const confirmPlay = (musique) => {
        wsClient.send("/app/action/lecteur/play", musique);
    };
    const confirmDelete = (musique) => {

    };
    const _sortEnd = ({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) { return; }

        playlistManagerActions.reorderPlaylist(oldIndex, newIndex);
        wsClient.send("/app/action/lecteur/sortCurrentPlaylist", {oldIndex, newIndex});
    };

    return (
        <div id={"playlistMenu"}>
            <PlaylistSortableList musiques={playlistManager.musiques}
                                  musiquePlaying={playlistManager.musiquePlaying}
                                  deleteMusique={deleteMusique}
                                  playMusique={playMusique}
                                  helperClass='playlistSortableHelper mobilePlaylistSortableHelper'
                                  onSortEnd={ _sortEnd }
                                  pressDelay={200}
                                  disableButtons={disableButtons}
                                  shouldCancelStart={() => disableButtons}
            />
            <ConfirmDialog ref={ instance => this.confirmPlay = instance}
                           message={"Lancer la chanson ? (Coupe la musique courante)"}
                           onConfirm={confirmPlay}
            />
            <ConfirmDialog ref={ instance => this.confirmDelete = instance}
                           message={"Supprimer la chanson de la playlist ?"}
                           onConfirm={confirmDelete}
            />
        </div>
    );
};

MobileCurrentPlaylist.propTypes = {
    disableButtons : PropTypes.bool.isRequired
};

export default connect(state => assign({}, {
    playlistManager: state.playlistManager,
    wsClient: state.wsClient
}), dispatch => ({
    playlistManagerActions: bindActionCreators(PlaylistManagerActions, dispatch)
}))(MobileCurrentPlaylist);