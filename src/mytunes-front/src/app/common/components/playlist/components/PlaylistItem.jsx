import React from 'react';
import {Icon} from "@material-ui/core";
import {IconButton} from "material-ui";
import PropTypes from "prop-types";
import cn from "classnames";
import { SortableElement } from 'react-sortable-hoc';

import {musiquePropType} from "../../../types/MusiqueType";
import {formateDuree} from "../../../util/Formatters";
import Classement from "../../../../pages/listeMusique/components/Classement";

const PlaylistItem = SortableElement(({musique, isPlaying, playMusique, deleteMusique, disableButtons}) => {
    return (
        <li className={
            cn([
                "playlistItem",
                { "alreadyPlayed" : musique.alreadyPlayed },
                { "error" : musique.error },
                { "isPlaying" : isPlaying }
            ])
        }>
            <span className="play">
                {isPlaying ?
                    <Icon className="material-icons">equalizer</Icon>
                    :
                    <IconButton onClick={(event) => playMusique(musique, event)}
                                disabled={disableButtons}
                    >
                        <Icon className="material-icons">play_arrow</Icon>
                    </IconButton>
                }
            </span>
            <span className="titre">{musique.titre}</span>
            <span className="classement"><Classement musique={musique} /></span>
            <span className="duree">{musique.duree ? formateDuree(musique.duree) : "-"}</span>
            <span className="delete">
                <IconButton onClick={(event) => deleteMusique(musique, event)}
                            disabled={disableButtons}
                >
                    <Icon className="material-icons">delete</Icon>
                </IconButton>
            </span>
        </li>
    )
});


PlaylistItem.propTypes = {
    musique: musiquePropType.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    playMusique: PropTypes.func.isRequired,
    deleteMusique: PropTypes.func.isRequired,
    disableButtons : PropTypes.bool.isRequired
};

export default PlaylistItem;