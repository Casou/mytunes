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
                <span className="musiqueCell delete"> </span>
            </li>
            {
                musiques.length === 0 ?
                    <span className={"noData"}>Pas de musique</span>
                    :
                    musiques.map((musique, index) => (
                        <SavedPlaylistItem key={`item-${index}`}
                                           index={index}
                                           musique={musique}
                                           isPlaying={musique === musiquePlaying}
                                           playMusique={playMusique}
                                           onDelete={props.onDeleteMusique}
                        />
            ))}
        </ul>
    );
});

SavedPlaylistSortableList.propTypes = {
    musiques: PropTypes.arrayOf(musiquePropType).isRequired,
    onDeleteMusique: PropTypes.func.isRequired
};

export default SavedPlaylistSortableList;

