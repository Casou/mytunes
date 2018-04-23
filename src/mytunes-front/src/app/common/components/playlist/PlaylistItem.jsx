import React from 'react';
import { musiquePropType } from "../../types/Musique";
import {SvgIcon} from "material-ui";

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
        <SvgIcon>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </SvgIcon>
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