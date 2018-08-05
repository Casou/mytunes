import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {assign} from "lodash";
import PlaylistSortableList from "../../../../../common/components/playlist/components/PlaylistSortableList";

import '../../../../../../style/components/playlistMenu.css';
import '../style/MobileCurrentPlaylist.css';
import ConfirmDialog from "../../../common/components/ConfirmDialog";


const MobileCurrentPlaylist = ({playlistManager, wsClient, disableButtons}) => {
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
    const _sortEnd = () => {

    };

    return (
        <div id={"playlistMenu"}>
            <PlaylistSortableList musiques={playlistManager.musiques}
                                  musiquePlaying={playlistManager.musiquePlaying}
                                  deleteMusique={deleteMusique}
                                  playMusique={playMusique}
                                  helperClass='playlistSortableHelper mobilePlaylistSortableHelper'
                                  onSortEnd={ this._sortEnd }
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
MobileCurrentPlaylist.defaultProps = {};

export default connect(state => assign({}, {
    playlistManager: state.playlistManager,
    wsClient: state.wsClient
}), null)(MobileCurrentPlaylist);