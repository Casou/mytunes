import React from "react";
import {IconButton} from "material-ui";
import {Icon} from "@material-ui/core";
import ListeMusiqueTextProperty from "../../pages/listeMusique/components/ListeMusiqueTextProperty";
import Classement from "../../pages/listeMusique/components/Classement";
import {formateDuree} from "../util/Formatters";
import SelectGenres from "../components/musiqueTable/SelectGenres";

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

    renderCell = (column) => {

        switch (column) {
            case 0 :
                return (
                    <IconButton onClick={() => this.onPlaylistAdd(this.musique)}>
                        <Icon className="material-icons">playlist_add</Icon>
                    </IconButton>
                );
            case 1 :
                return (
                    <ListeMusiqueTextProperty
                        uniqueKey={"titre_" + this.index}
                        defaultValue={this.musique.titre}
                        name={"titre"}
                        isFetching={this.musique.isFetching["titre"]}
                        onChange={(value) => this.onPropertyChange("titre", value, this.index)}
                    />
                );
            case 2 :
                return (
                    <ListeMusiqueTextProperty
                        uniqueKey={"artiste_" + this.index}
                        defaultValue={this.musique.artiste ? this.musique.artiste : ""}
                        name={"artiste"}
                        isFetching={this.musique.isFetching["artiste"]}
                        onChange={(value) => this.onPropertyChange("artiste", value, this.index)}
                    />
                );
            case 3 :
                return (formateDuree(this.musique.duree));
            case 4 :
                return (
                    <ListeMusiqueTextProperty
                        uniqueKey={"bpm_" + this.musique.index}
                        defaultValue={this.musique.bpm ? Math.round(this.musique.bpm / 4) : ""}
                        name={"bpm"}
                        isFetching={this.musique.isFetching["bpm"]}
                        onlyNumbers
                        onChange={(value) => this.onPropertyChange("bpm", value * 4, this.index)}
                    />
                );
            case 5 :
                return (
                    <SelectGenres genres={ this.genres }
                                  selectedGenreIds={ this.musique.genreIds }
                                  isFetching={ this.musique.isFetching["genreIds"] }
                                  onChange={ (selectedGenreIds) => this.onPropertyChange("genreIds", selectedGenreIds, this.index) }
                    />
                );
            case 6 :
                return (
                    <Classement key={"classement_" + this.musique.id}
                                musique={this.musique}
                                isFetching={this.musique.isFetching["classement"]}
                                onChange={(value) => this.onPropertyChange("classement", value, this.index)}
                    />
                );
            case 7 :
                return (
                    <ListeMusiqueTextProperty
                        uniqueKey={"commentaire_" + this.index}
                        defaultValue={this.musique.commentaire ? this.musique.commentaire : ""}
                        name={"commentaire"}
                        isFetching={this.musique.isFetching["commentaire"]}
                        onChange={(value) => this.onPropertyChange("commentaire", value, this.index)}
                    />
                );
            default :
                throw new RangeError("Numéro de colonne inconnu pour le renderCell : " + column);
        }
    };

}