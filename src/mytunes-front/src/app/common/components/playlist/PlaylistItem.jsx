import React from 'react';
import { musiquePropType } from "../../types/Musique";
import {FontIcon, IconButton} from "material-ui";

export const PlaylistItem = props => {
  const { musique } = props;
  
  const formate10 = number => {
    return number >= 10 ? number : "0" + number;
  };
  
  const formateDuree = duree => {
    const sec_num = parseInt(duree / 1000, 10);
    const hours   = Math.floor(sec_num / 3600) % 24;
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;
    return ((hours > 0) ? formate10(hours) + ":" : "")
      + formate10(minutes) + ":"
      + formate10(seconds);

  };
  
  return (
    <li>
      <span className="play">
        <IconButton onClick={ () => null }>
          <FontIcon className="material-icons">playlist_arrow</FontIcon>
        </IconButton>
      </span>
      <span className="titre">{ musique.titre }</span>
      <span className="duree">{ musique.duree ? formateDuree(musique.duree) : "-" }</span>
    </li>
  )
};

PlaylistItem.propTypes = {
  musique : musiquePropType.isRequired
};

export default PlaylistItem;