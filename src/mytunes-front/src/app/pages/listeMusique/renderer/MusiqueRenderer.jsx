import React from "react";
import { FontIcon, IconButton, TextField } from "material-ui";
import ListeMusiqueTextProperty from "../components/ListeMusiqueTextProperty";
import Classement from "../components/Classement";
import {formateDuree} from "../../../common/util/Formatters";

export class MusiqueRenderer {
  constructor(musique, index, actionMethods) {
    this.musique = musique;
    this.onPropertyChange = actionMethods.onPropertyChange;
    this.onPlaylistAdd = actionMethods.onPlaylistAdd;
    this.index = index;
  }
  
  fetching(property, isFetching) {
    this.musique.isFetching[property] = isFetching;
  }
  
  changeProperty(property, value) {
    this.musique[property] = value;
  }
  
  renderCell = (column) => {
    
    switch (column) {
      case 0 :
        return (
          <IconButton onClick={ () => this.onPlaylistAdd(this.index) }>
            <FontIcon className="material-icons">playlist_add</FontIcon>
          </IconButton>
        );
      case 1 :
        return (
          <ListeMusiqueTextProperty
            uniqueKey={"titre_" + this.index}
            defaultValue={ this.musique.titre }
            name={"titre"}
            isFetching={ this.musique.isFetching["titre"] }
            onChange={ (e) => this.onPropertyChange("titre", e.target.value, this.index) }
          />
        );
      case 2 :
        return (
          <ListeMusiqueTextProperty
            uniqueKey={"artiste_" + this.index}
            defaultValue={ this.musique.artiste ? this.musique.artiste : "" }
            name={"artiste"}
            isFetching={ this.musique.isFetching["artiste"] }
            onChange={ (e) => this.onPropertyChange("artiste", e.target.value, this.index) }
          />
        );
      case 3 :
        return ( formateDuree(this.musique.duree) );
      case 4 :
        return (
          <ListeMusiqueTextProperty
            uniqueKey={"bpm_" + this.musique.index}
            defaultValue={ this.musique.bpm ? Math.round(this.musique.bpm / 4) : "" }
            name={"bpm"}
            isFetching={ this.musique.isFetching["bpm"] }
            onlyNumbers
            onChange={ (e) => this.onPropertyChange("bpm", e.target.value * 4, this.index) }
          />
        );
      case 5 :
        return (
          <TextField
            className="textField" fullWidth={true} underlineShow={ false }
            name={"genre"}
            defaultValue={ this.genre ? this.genre : "" }
          />
        );
      case 6 :
        return (
          <Classement key={ "classement_" + this.musique.itunesId }
                      musique={ this.musique }
                      isFetching={ this.musique.isFetching["classement"] }
                      onChange={ (value) => this.onPropertyChange("classement", value, this.index) }
          />
        );
      case 7 :
        return (
          <ListeMusiqueTextProperty
            uniqueKey={"commentaire_" + this.index}
            defaultValue={ this.musique.commentaire ? this.musique.commentaire : "" }
            name={"commentaire"}
            isFetching={ this.musique.isFetching["commentaire"] }
            onChange={ (e) => this.onPropertyChange("commentaire", e.target.value, this.index) }
          />
        );
      default :
        throw new RangeError("Numéro de colonne inconnu pour le renderCell : " + column);
    }
  };
  
}