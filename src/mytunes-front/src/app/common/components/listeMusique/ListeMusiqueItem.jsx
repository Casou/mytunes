import React, { Component } from 'react';
import { musiquePropType } from "../../types/Musique";

export default class ListeMusiqueItem extends Component {
  render() {
    const { musique } = this.props;
    return (
      <tr>
        <td className={ "action" }>[>]</td>
        <td className={ "titre" }>{ musique.nom }</td>
        <td className={ "artiste" }>{ musique.artiste }</td>
        <td className={ "duree" }>{ this.formateDuree(musique.duree) }</td>
        <td className={ "bpm" }>{ musique.bpm ? musique.bpm / 4 : "" }</td>
        <td className={ "genre" }>{ musique.genre }</td>
        <td className={ "classement" }>{ musique.classement }</td>
        <td className={ "commentaire" }>{ musique.commentaire }</td>
      </tr>
    );
  }
  
  formateDuree(duree) {
    // var date = new Date(1970,0,1);
    // date.setMilliseconds(duree / 1000);
    // return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    
    const sec_num = parseInt(duree / 1000, 10);
    const hours   = Math.floor(sec_num / 3600) % 24;
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;
    return ((hours > 0) ? this.formate10(hours) + ":" : "")
      + this.formate10(minutes) + ":"
      + this.formate10(seconds);
    
  }
  
  formate10(number) {
    return number >= 10 ? number : "0" + number;
  }
}

ListeMusiqueItem.propTypes = {
  musique : musiquePropType.isRequired
};