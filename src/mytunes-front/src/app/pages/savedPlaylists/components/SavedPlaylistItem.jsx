import React from 'react';
import PropTypes from "prop-types";
import { SortableElement } from 'react-sortable-hoc';
import { IconButton } from 'material-ui';
import FontAwesome from 'react-fontawesome';

import {musiquePropType} from "../../../common/types/MusiqueType";
import {formateDuree} from "../../../common/util/Formatters";
import Classement from "../../listeMusique/components/Classement";

const SavedPlaylistItem = SortableElement((props) => {
    const {musique} = props;

    return (
        <li>
            <span className="musiqueCell titre">{musique.titre}</span>
            <span className="musiqueCell classement">
                <Classement musique={musique}
                            isFetching={false}
                            onChange={() => null}
                />
            </span>
            <span className="musiqueCell bpm">{musique.bpm}</span>
            <span className="musiqueCell duree">{musique.duree ? formateDuree(musique.duree) : "-"}</span>
            <span className="musiqueCell delete">
                <IconButton onClick={() => props.onDelete(musique) }>
                    <FontAwesome name={"trash"} className="material-icons" />
                </IconButton>
            </span>
        </li>
    )
});


SavedPlaylistItem.propTypes = {
    musique: musiquePropType.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default SavedPlaylistItem;