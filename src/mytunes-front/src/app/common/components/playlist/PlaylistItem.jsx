import React from 'react';
import {FontIcon, IconButton} from "material-ui";
import PropTypes from "prop-types";

import { musiquePropType } from "../../types/Musique";
import {formateDuree} from "../../util/Formatters";

export const PlaylistItem = props => {
  const { musique, isPlaying } = props;
  
  return (
    <li>
      <span className="play">
        { isPlaying ?
          <IconButton onClick={ () => null }>
            <FontIcon className="material-icons">equalizer</FontIcon>
          </IconButton>
          :
          <IconButton onClick={ () => null }>
            <FontIcon className="material-icons">play_arrow</FontIcon>
          </IconButton>
        }
      </span>
      <span className="titre">{ musique.titre }</span>
      <span className="duree">{ musique.duree ? formateDuree(musique.duree) : "-" }</span>
    </li>
  )
};

PlaylistItem.propTypes = {
  musique : musiquePropType.isRequired,
  isPlaying : PropTypes.bool.isRequired,
  alreadyPlayed : PropTypes.bool.isRequired
};

export default PlaylistItem;