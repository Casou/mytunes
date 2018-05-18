import React from 'react';
import PropTypes from 'prop-types';
import {SortableContainer} from 'react-sortable-hoc';
import SavedPlaylistItem from "./SavedPlaylistItem";
import {musiquePropType} from "../../../common/types/MusiqueType";

const SavedPlaylistSortableList = SortableContainer((props) => {
    const { musiques, musiquePlaying, playMusique } = props;
    return (
        <ul>
            <li id={"headerMusiquesPlaylist"}>
                <span className="musiqueCell titre">Titre</span>
                <span className="musiqueCell classement">Class.</span>
                <span className="musiqueCell bpm">BPM</span>
                <span className="musiqueCell duree">Durée</span>
            </li>
            {musiques.map((musique, index) => (
                <SavedPlaylistItem key={`item-${index}`}
                                   index={index}
                                   musique={musique}
                                   isPlaying={musique === musiquePlaying}
                                   playMusique={playMusique} />
            ))}
        </ul>
    );
});

SavedPlaylistSortableList.propTypes = {
    musiques: PropTypes.arrayOf(musiquePropType).isRequired
};

export default SavedPlaylistSortableList;

