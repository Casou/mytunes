import React from "react";
import { FontIcon, IconButton, SelectField, MenuItem } from "material-ui";
import ListeMusiqueTextProperty from "../components/ListeMusiqueTextProperty";
import Classement from "../components/Classement";
import {formateDuree} from "../../../common/util/Formatters";

export class MusiqueRenderer {
  constructor(musique, index, actionMethods, genres) {
    this.musique = musique;
    this.onPropertyChange = actionMethods.onPropertyChange;
    this.onPlaylistAdd = actionMethods.onPlaylistAdd;
    this.index = index;
    this.genres = genres;
  }
  
  fetching(property, isFetching) {
    this.musique.isFetching[property] = isFetching;
  }
  
  changeProperty(property, value) {
    this.musique[property] = value;
  }

    selectFieldGenres(values) {
        return this.genres ? this.genres.map((genre) => (
            <MenuItem
                key={"genre_" + genre.id + "_" + this.musique.itunesId }
                insetChildren={true}
                checked={values && values.indexOf(genre.id) > -1}
                value={genre.id}
                primaryText={genre.label}
            />
        ))
            :
            "";
    }
  
  renderCell = (column) => {
    
    switch (column) {
      case 0 :
        return (
          <IconButton onClick={ () => this.onPlaylistAdd(this.musique) }>
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
            <SelectField
                multiple={true}
                value={this.musique.genreIds}
                onChange={(e) => this.onPropertyChange("genreIds", e.target.value, this.index)}
            >
                { this.selectFieldGenres(this.musique.genreIds) }
            </SelectField>

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