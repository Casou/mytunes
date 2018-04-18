import React from 'react';
import PropTypes from "prop-types";
import { musiquePropType } from "../../types/Musique";

export const ListeMusiqueItem = props => {
  const { addMusiqueToPlaylist, musique } = props;
  
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
  
  const formateClassement = classement => {
    const stars = [0, 1, 2, 3, 4];
    const rating = classement ? classement / 20 : 0;
    return (
      <span className={ "rating" }>
        { stars.map(star => (
            <span className={ "ratingStar" } onClick={ () => updateRating(star + 1, musique) }>
              { star >= rating ? "☆" : "★" }
            </span>
          ))
        }
      </span>
    );
  };
  
  const updateRating = (rating, musique) => {
    alert(musique.nom + " : new rating = " + rating);
  };
  
  return (
    <tr>
      <td className={ "action" }><span onClick={ addMusiqueToPlaylist }>►+</span></td>
      <td className={ "titre" }>{ musique.nom }</td>
      <td className={ "artiste" }>{ musique.artiste }</td>
      <td className={ "duree" }>{ formateDuree(musique.duree) }</td>
      <td className={ "bpm" }>{ musique.bpm ? musique.bpm / 4 : "" }</td>
      <td className={ "genre" }>{ musique.genre }</td>
      <td className={ "classement" }>{ formateClassement(musique.classement) }</td>
      <td className={ "commentaire" }>{ musique.commentaire }</td>
    </tr>
  )
};

ListeMusiqueItem.propTypes = {
  musique : musiquePropType.isRequired,
  addMusiqueToPlaylist : PropTypes.func.isRequired
};

export default ListeMusiqueItem;