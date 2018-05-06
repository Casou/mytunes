import React from 'react';
import {FontIcon, IconButton} from "material-ui";
import PropTypes from "prop-types";
import cn from "classnames";

import {musiquePropType} from "../../types/Musique";
import {formateDuree} from "../../util/Formatters";

export const PlaylistItem = props => {
    const {musique, isPlaying, playMusique, alreadyPlayed} = props;

    return (
        <li className={ cn({ "alreadyPlayed" : alreadyPlayed }) }>
            <span className="play">
                {isPlaying ?
                    <FontIcon className="material-icons">equalizer</FontIcon>
                    :
                    <IconButton onClick={() => playMusique(musique)}>
                        <FontIcon className="material-icons">play_arrow</FontIcon>
                    </IconButton>
                }
            </span>
            <span className="titre">{musique.titre}</span>
            <span className="duree">{musique.duree ? formateDuree(musique.duree) : "-"}</span>
        </li>
    )
};

PlaylistItem.propTypes = {
    musique: musiquePropType.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    alreadyPlayed: PropTypes.bool.isRequired,
    playMusique: PropTypes.func.isRequired
};

export default PlaylistItem;