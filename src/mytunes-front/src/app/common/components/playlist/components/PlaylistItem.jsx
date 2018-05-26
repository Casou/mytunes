import React from 'react';
import {FontIcon, IconButton} from "material-ui";
import PropTypes from "prop-types";
import cn from "classnames";
import { SortableElement } from 'react-sortable-hoc';

import {musiquePropType} from "../../../types/MusiqueType";
import {formateDuree} from "../../../util/Formatters";
import Classement from "../../../../pages/listeMusique/components/Classement";

const PlaylistItem = SortableElement((props) => {
    const {musique, isPlaying, playMusique, deleteMusique} = props;

    return (
        <li className={
            cn({ "alreadyPlayed" : musique.alreadyPlayed },
                { "isPlaying" : isPlaying })
        }>
            <span className="play">
                {isPlaying ?
                    <FontIcon className="material-icons">equalizer</FontIcon>
                    :
                    <IconButton onClick={(event) => playMusique(musique, event)}>
                        <FontIcon className="material-icons">play_arrow</FontIcon>
                    </IconButton>
                }
            </span>
            <span className="titre">{musique.titre}</span>
            <span className="classement"><Classement musique={musique} /></span>
            <span className="duree">{musique.duree ? formateDuree(musique.duree) : "-"}</span>
            <span className="delete">
                <IconButton onClick={(event) => deleteMusique(musique, event)}>
                    <FontIcon className="material-icons">delete</FontIcon>
                </IconButton>
            </span>
        </li>
    )
});


PlaylistItem.propTypes = {
    musique: musiquePropType.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    playMusique: PropTypes.func.isRequired,
    deleteMusique: PropTypes.func.isRequired
};

export default PlaylistItem;