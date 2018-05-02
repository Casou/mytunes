import React from 'react';
import PropTypes from "prop-types";
import { FontIcon, IconButton, TextField } from "material-ui";
import { musiquePropType } from "../../../common/types/Musique";
import { connect } from "react-redux";
import { assign } from "lodash";
import VirtualizeTable from "../../../common/components/virtualizeTable/VirtualizeTable";
import Classement from "../components/Classement";


class ListeMusique extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText : '',
      musiques : this.props.musiques
    };
  }
  
  updateRating(rating, musique) {
      console.log(musique.titre + " : new rating = " + rating);
      // this.stompClient.send({
      //     musique: musique,
      //     newClassement: rating
      // });
  }
  
  updateProperty = (musique) => {
    console.log("updateProperty", musique);
  };
  
  addMusiqueToPlaylist = (musique) => {
    console.log("addMusiqueToPlaylist " + musique.titre);
  };
  
  searchMusique(text) {
    const { musiques } = this.state;
    const musiquesFiltered = [...musiques].filter(musique => musique);
    console.log(musiquesFiltered);
    musiquesFiltered.forEach(musique => {
      musique.isHidden = musique.searchText.indexOf(text.toLowerCase()) < 0;
    });
    
    this.setState({
      ...this.state,
      searchText : text,
      musiques : musiquesFiltered
    });
  }
  
  getFilteredMusiques() {
    const { musiques, searchText } = this.state;
    
    if (searchText) {
      return musiques.filter(musique => musique.searchText.indexOf(searchText.toLowerCase()) >= 0);
    }
    return musiques;
  }

  render() {
    // let filteredMusiques = [];
    // if (this.props.musiques) {
    //   filteredMusiques = this.getFilteredMusiques();
    // }

      const headers = [
          { name : "",            className : "action",       widthPercentage : 5 / 100 },
          { name : "Titre",       className : "titre",        widthPercentage : 16 / 100 },
          { name : "Artiste",     className : "artiste",      widthPercentage : 15 / 100 },
          { name : "Durée",       className : "duree",        widthPercentage : 7 / 100 },
          { name : "BPM",         className : "bpm",          widthPercentage : 5 / 100 },
          { name : "Genre",       className : "genre",        widthPercentage : 15 / 100 },
          { name : "Class.",      className : "classement",   widthPercentage : 8 / 100 },
          { name : "Commentaire", className : "commentaire",  widthPercentage : 29 / 100 }
      ];

      return (
        <section className="listeMusiques">
          <VirtualizeTable headers={ headers }
                           data={ this.mapMusiques(this.props.musiques) } />
        </section>
      );
  }

    mapMusiques(musiques) {
        return musiques.map(musique => { return {...musique,
            renderCell: (column) => {
                switch (column) {
                    case 0 :
                        return (
                            <IconButton>
                                <FontIcon className="material-icons">playlist_add</FontIcon>
                            </IconButton>
                        );
                        break;
                    case 1 :
                        return (
                            <TextField
                                className="textField" fullWidth={ true } underlineShow={ false }
                                name={"titre"}
                                defaultValue={ musique.titre }
                            />
                        );
                        break;
                    case 2 :
                        return (
                            <TextField
                                className="textField" fullWidth={true} underlineShow={ false }
                                name={"artiste"}
                                defaultValue={ musique.artiste ? musique.artiste : "" }
                            />
                        );
                        break;
                    case 3 :
                        return (
                            musique.duree
                        );
                        break;
                    case 4 :
                        return (
                            <TextField
                                className="textField" fullWidth={true} underlineShow={ false }
                                name={"bpm"}
                                defaultValue={ musique.bpm ? musique.bpm / 4 : "" }
                            />
                        );
                        break;
                    case 5 :
                        return (
                            <TextField
                                className="textField" fullWidth={true} underlineShow={ false }
                                name={"genre"}
                                defaultValue={ musique.genre ? musique.genre : "" }
                            />
                        );
                        break;
                    case 6 :
                        return (
                            <Classement key={ "classement_" + musique.itunesId }
                                        musique={ musique }
                            />
                        );
                        break;
                    case 7 :
                        return (
                            <TextField
                                className="textField" fullWidth={true} underlineShow={ false }
                                name={"commentaire"}
                                defaultValue={ musique.commentaire ? musique.commentaire : "" }
                            />
                        );
                        break;
                    default :
                        throw new RangeError("Numéro de colonne inconnu pour le renderCell : " + column);
                        break;
                }
            }
        } });
    }

}

ListeMusique.propTypes = {
  musiques: PropTypes.arrayOf(musiquePropType).isRequired
};

export default connect(state => assign({}, {
  musiques: state.musiques
}), null)(ListeMusique);
