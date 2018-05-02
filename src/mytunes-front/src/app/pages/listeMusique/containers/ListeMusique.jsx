import React from 'react';
import PropTypes from "prop-types";
import { FontIcon, IconButton, TextField } from "material-ui";
import { musiquePropType } from "../../../common/types/Musique";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { assign } from "lodash";
import VirtualizeTable from "../../../common/components/virtualizeTable/VirtualizeTable";
import Classement from "../components/Classement";
import ListeMusiqueTextProperty from "../components/ListeMusiqueTextProperty";
import MusiquesActions from "../actions/MusiquesActions";


class ListeMusique extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText : '',
      musiques : this.props.musiques
    };
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
  
  formate10 = number => {
    return number >= 10 ? number : "0" + number;
  };
  
  formateDuree = duree => {
    const sec_num = parseInt(duree / 1000, 10);
    const hours   = Math.floor(sec_num / 3600) % 24;
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;
    return ((hours > 0) ? this.formate10(hours) + ":" : "")
      + this.formate10(minutes) + ":"
      + this.formate10(seconds);
  };
  

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
                           data={ this.mapMusiques(this.state.musiques) } />
        </section>
      );
  }

    mapMusiques(musiques) {
        return musiques.map((musique, index) => { return {...musique,
            renderCell: (column) => {
                switch (column) {
                    case 0 :
                        return (
                            <IconButton>
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
                                onChange={ (e) => this.onPropertyChange("titre", musique, e.target.value, index) }
                            />
                        );
                    case 2 :
                        return (
                            <ListeMusiqueTextProperty
                                uniqueKey={"artiste_" + index}
                                defaultValue={ musique.artiste ? musique.artiste : "" }
                                name={"artiste"}
                                isFetching={ musique.isFetching["artiste"] }
                                onChange={ (e) => this.onPropertyChange("artiste", musique, e.target.value, index) }
                            />
                        );
                    case 3 :
                        return ( this.formateDuree(musique.duree) );
                    case 4 :
                        return (
                            <ListeMusiqueTextProperty
                              uniqueKey={"bpm_" + index}
                              defaultValue={ musique.bpm ? Math.round(musique.bpm / 4) : "" }
                              name={"bpm"}
                              isFetching={ musique.isFetching["bpm"] }
                              onlyNumbers
                              onChange={ (e) => this.onPropertyChange("bpm", musique, e.target.value * 4, index) }
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
                                        onChange={ (value) => this.onPropertyChange("classement", musique, value, index) }
                            />
                        );
                    case 7 :
                        return (
                            <ListeMusiqueTextProperty
                                uniqueKey={"commentaire_" + index}
                                defaultValue={ musique.commentaire ? musique.commentaire : "" }
                                name={"commentaire"}
                                isFetching={ musique.isFetching["commentaire"] }
                                onChange={ (e) => this.onPropertyChange("commentaire", musique, e.target.value, index) }
                            />
                        );
                    default :
                        throw new RangeError("Numéro de colonne inconnu pour le renderCell : " + column);
                }
            }
        } });
    }
  
    onPropertyChange(property, musique, newValue, index) {
      if (musique.isFetching[property] || musique[property] === newValue) {
        return;
      }
    
      const modifiedMusiques = [ ...this.state.musiques ];
      modifiedMusiques[index] = {
        ...musique,
        isFetching: {
          ...musique.isFetching,
          [property]: true
        }
      };
      
      // Grey
      this.setState({
        ...this.state,
        musiques: modifiedMusiques
      }, () => {
        this.props.musiquesActions.updateMusique(musique, property, newValue)
        .then(()=> {
          modifiedMusiques[index] = {
            ...musique,
            [property]: newValue,
            isFetching: {
              ...musique.isFetching,
              [property]: false
            }
          };
  
          this.setState({
            ...this.state,
            musiques: modifiedMusiques
          });
        })
        .catch(() => {
          this.setState({
            ...this.state,
            musique: {
              ...musique,
              isFetching: {
                ...musique.isFetching,
                [property]: false
              }
            }
          });
        });
      });
    }

}

ListeMusique.propTypes = {
  musiques: PropTypes.arrayOf(musiquePropType).isRequired
};

export default connect(state => assign({}, {
  musiques: state.musiques
}), dispatch => ({
  musiquesActions: bindActionCreators(MusiquesActions, dispatch)
}))(ListeMusique);
