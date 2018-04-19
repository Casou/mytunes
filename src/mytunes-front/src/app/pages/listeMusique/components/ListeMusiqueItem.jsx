import React from 'react';
import PropTypes from "prop-types";
import { musiquePropType } from "../../../common/types/Musique";
import Classement from "./Classement";

export const ListeMusiqueItem = props => {
  const { addMusiqueToPlaylist, musique, updateRating } = props;
  
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
    <tr>
      <td className={ "action" }><span onClick={ () => addMusiqueToPlaylist(musique) }>►+</span></td>
      <td className={ "titre" }>{ musique.titre }</td>
      <td className={ "artiste" }>{ musique.artiste }</td>
      <td className={ "duree" }>{ formateDuree(musique.duree) }</td>
      <td className={ "bpm" }>{ musique.bpm ? musique.bpm / 4 : "" }</td>
      <td className={ "genre" }>{ musique.genre }</td>
      <td className={ "classement" }><Classement key={ "classement_" + musique.itunesId } musique={ musique } updateRating={ updateRating } /></td>
      <td className={ "commentaire" }>{ musique.commentaire }</td>
    </tr>
  )
};

ListeMusiqueItem.propTypes = {
  musique : musiquePropType.isRequired,
  addMusiqueToPlaylist : PropTypes.func.isRequired,
  updateRating : PropTypes.func.isRequired
};

export default ListeMusiqueItem;