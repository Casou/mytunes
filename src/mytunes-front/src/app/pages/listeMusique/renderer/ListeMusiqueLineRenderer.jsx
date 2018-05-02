import React from "react";
import { FontIcon, IconButton, TextField } from "material-ui";
import ListeMusiqueTextProperty from "../components/ListeMusiqueTextProperty";
import Classement from "../components/Classement";
import {formateDuree} from "../../../common/util/Formatters";

export const addRenderMusiqueLine = (musiques, { onPropertyChange, onPlaylistAdd }) => {
  return musiques.map((musique, index) => { return {...musique,
    renderCell: (column) => {
      switch (column) {
        case 0 :
          return (
            <IconButton onClick={ () => onPlaylistAdd(index) }>
              <FontIcon className="material-icons">playlist_add</FontIcon>
            </IconButton>
          );
        case 1 :
          return (
            <ListeMusiqueTextProperty
              uniqueKey={"titre_" + index}
              defaultValue={ musique.titre }
              name={"titre"}
              isFetching={ musique.isFetching["titre"] }
              onChange={ (e) => onPropertyChange("titre", e.target.value, index) }
            />
          );
        case 2 :
          return (
            <ListeMusiqueTextProperty
              uniqueKey={"artiste_" + index}
              defaultValue={ musique.artiste ? musique.artiste : "" }
              name={"artiste"}
              isFetching={ musique.isFetching["artiste"] }
              onChange={ (e) => onPropertyChange("artiste", e.target.value, index) }
            />
          );
        case 3 :
          return ( formateDuree(musique.duree) );
        case 4 :
          return (
            <ListeMusiqueTextProperty
              uniqueKey={"bpm_" + index}
              defaultValue={ musique.bpm ? Math.round(musique.bpm / 4) : "" }
              name={"bpm"}
              isFetching={ musique.isFetching["bpm"] }
              onlyNumbers
              onChange={ (e) => onPropertyChange("bpm", e.target.value * 4, index) }
            />
          );
        case 5 :
          return (
            <TextField
              className="textField" fullWidth={true} underlineShow={ false }
              name={"genre"}
              defaultValue={ musique.genre ? musique.genre : "" }
            />
          );
        case 6 :
          return (
            <Classement key={ "classement_" + musique.itunesId }
                        musique={ musique }
                        isFetching={ musique.isFetching["classement"] }
                        onChange={ (value) => onPropertyChange("classement", value, index) }
            />
          );
        case 7 :
          return (
            <ListeMusiqueTextProperty
              uniqueKey={"commentaire_" + index}
              defaultValue={ musique.commentaire ? musique.commentaire : "" }
              name={"commentaire"}
              isFetching={ musique.isFetching["commentaire"] }
              onChange={ (e) => onPropertyChange("commentaire", e.target.value, index) }
            />
          );
        default :
          throw new RangeError("Numéro de colonne inconnu pour le renderCell : " + column);
      }
    }
  }
  });
};