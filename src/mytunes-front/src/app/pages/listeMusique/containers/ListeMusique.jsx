import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { assign } from "lodash";
import { FontIcon, TextField } from "material-ui";

import { musiquePropType } from "../../../common/types/Musique";
import { addRenderMusiqueLine } from "../renderer/ListeMusiqueLineRenderer";
import VirtualizeTable from "../../../common/components/virtualizeTable/VirtualizeTable";
import MusiquesActions from "../actions/MusiquesActions";
import PlaylistActions from "../../../common/actions/PlaylistActions";

import {__KEYCODE_ENTER__} from "../../../../App";

import '../../../../style/components/listeMusiques.css';


class ListeMusique extends React.Component {
  constructor(props) {
    super(props);
    
    this.headers = [
      { name : "",            className : "action",       widthPercentage : 5 / 100 },
      { name : "Titre",       className : "titre",        widthPercentage : 16 / 100 },
      { name : "Artiste",     className : "artiste",      widthPercentage : 15 / 100 },
      { name : "Durée",       className : "duree",        widthPercentage : 7 / 100 },
      { name : "BPM",         className : "bpm",          widthPercentage : 5 / 100 },
      { name : "Genres",      className : "genre",        widthPercentage : 15 / 100 },
      { name : "Class.",      className : "classement",   widthPercentage : 8 / 100 },
      { name : "Commentaire", className : "commentaire",  widthPercentage : 29 / 100 }
    ];

    this.state = {
      searchText : '',
      musiques : addRenderMusiqueLine(this.props.musiques, {
        onPropertyChange : this.onPropertyChange.bind(this),
        onPlaylistAdd : props.playlistActions.addMusiqueToPlaylist
      })
    };
  }
  
  addMusiqueToPlaylist = (musique) => {
    console.log("TODO addMusiqueToPlaylist " + musique.titre);
  };
  
  searchMusique(text) {
    this.setState({
      ...this.state,
      searchText : text
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
      let filteredMusiques = [];
      if (this.state.musiques) {
        filteredMusiques = this.getFilteredMusiques();
      }
      
      return (
        <section id="listeMusiques">
          <section id="searchMusique">
            <FontIcon className="material-icons">search</FontIcon>
            <TextField className="textField" name={"search"} placeholder={"Recherche"}
                       onKeyPress={ e => {
                         if (e.which === __KEYCODE_ENTER__ || e.keyCode === __KEYCODE_ENTER__) {
                           this.searchMusique(e.target.value);
                         }
                       }}
            />
          </section>
          <VirtualizeTable headers={ this.headers }
                           data={ filteredMusiques } />
        </section>
      );
  }

    onPropertyChange(property, newValue, index) {
      const musique = this.state.musiques[index];
      if (musique.isFetching[property] || musique[property] === newValue) {
        return;
      }
    
      const modifiedMusiques = [...this.state.musiques];
      modifiedMusiques[index] = {
        ...musique,
        isFetching: {
          ...musique.isFetching,
          [property]: true
        }
      };
  
      this.setState({
        ...this.state,
        musiques: modifiedMusiques
      });
  
      /*
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
          modifiedMusiques[index] = {
            ...musique,
            isFetching: {
              ...musique.isFetching,
              [property]: false
            }
          };
  
          this.setState({
            ...this.state,
            musiques: modifiedMusiques
          });
        });
      });
      */
    }
}

ListeMusique.propTypes = {
  musiques: PropTypes.arrayOf(musiquePropType).isRequired
};

export default connect(state => assign({}, {
  musiques: state.musiques
}), dispatch => ({
  musiquesActions: bindActionCreators(MusiquesActions, dispatch),
  playlistActions: bindActionCreators(PlaylistActions, dispatch)
}))(ListeMusique);
