import React from 'react';
import PropTypes from 'prop-types';
import {SortableContainer} from 'react-sortable-hoc';
import PlaylistItem from "./PlaylistItem";
import {musiquePropType} from "../../../types/MusiqueType";

const PlaylistSortableList = SortableContainer((props) => {
    const { musiques, musiquePlaying, playMusique } = props;
    return (
        <ul>
            {musiques.map((musique, index) => (
                <PlaylistItem key={`item-${index}`}
                              index={index}
                              musique={musique}
                              isPlaying={musique === musiquePlaying}
                              playMusique={playMusique} />
            ))}
        </ul>
    );
});

PlaylistSortableList.propTypes = {
    musiques: PropTypes.arrayOf(musiquePropType).isRequired,
    musiquePlaying: PropTypes.shape({type: PropTypes.oneOf([musiquePropType])}),
    playMusique : PropTypes.func.isRequired
};

export default PlaylistSortableList;

