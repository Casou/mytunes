import React from 'react';
import {connect} from "react-redux";
import {assign} from "lodash";
import PlaylistSortableList from "../../../../../common/components/playlist/components/PlaylistSortableList";

import '../../../../../../style/components/playlistMenu.css';
import '../style/mobilePlaylist.css';


const MobileCurrentPlaylist = ({playlistManager}) => {
    const deleteMusique = (musique) => {

    };
    const playMusique = (musique) => {

    };

    return (
        <div id={"playlistMenu"}>
            <PlaylistSortableList musiques={playlistManager.musiques}
                                  musiquePlaying={playlistManager.musiquePlaying}
                                  deleteMusique={deleteMusique}
                                  playMusique={playMusique}
            />
        </div>
    );
};

/*
const MobileCurrentPlaylist = SortableContainer((props) => {
    const { playlistManager } = props;

    const playMusique = () => {

    };

    const deleteMusique = () => {

    };


    return (
        <ul>
            { playlistManager.musiques.map((musique, index) => (
                <MobilePlaylistItem key={`item-${index}`}
                              index={index}
                              musique={musique}
                              isPlaying={playlistManager.musiquePlaying && musique.uniqueId === playlistManager.musiquePlaying.uniqueId}
                              playMusique={playMusique}
                              deleteMusique={deleteMusique}
                />
            ))}
        </ul>
    );
});
*/

MobileCurrentPlaylist.propTypes = {};
MobileCurrentPlaylist.defaultProps = {};

export default connect(state => assign({}, {
    playlistManager: state.playlistManager
}), null)(MobileCurrentPlaylist);