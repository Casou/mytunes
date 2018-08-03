import React from 'react';
import {connect} from "react-redux";
import {assign} from "lodash";
import PlaylistSortableList from "../../../../../common/components/playlist/components/PlaylistSortableList";

import '../../../../../../style/components/playlistMenu.css';
import '../style/MobileCurrentPlaylist.css';
import ConfirmDialog from "../../../common/components/ConfirmDialog";


const MobileCurrentPlaylist = ({playlistManager}) => {
    const deleteMusique = (musique) => {
        this.confirmDelete.openDialog(musique);
    };
    const playMusique = (musique) => {
        this.confirmPlay.openDialog(musique);
    };
    const confirmPlay = (musique) => {

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
                                  helperClass='playlistSortableHelper'
                                  onSortEnd={ this._sortEnd }
                                  pressDelay={200}
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

MobileCurrentPlaylist.propTypes = {};
MobileCurrentPlaylist.defaultProps = {};

export default connect(state => assign({}, {
    playlistManager: state.playlistManager
}), null)(MobileCurrentPlaylist);