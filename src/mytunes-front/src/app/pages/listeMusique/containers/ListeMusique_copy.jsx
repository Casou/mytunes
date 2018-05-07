import React from 'react';
import PropTypes from "prop-types";
import ListeMusiqueHeader from "../components/ListeMusiqueHeader";
import ListeMusiqueItem from "../components/ListeMusiqueItem";
import { musiquePropType } from "../../../common/types/Musique";
import { connect } from "react-redux";
import { assign } from "lodash";


class ListeMusique extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    
    this.state = {
      searchText : '',
      musiques : this.props.musiques
    };
  }
  
  updateRating (rating, musique) {
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
    
    return (
      <section className="listeMusiques">
        <table>
          <ListeMusiqueHeader onSearch={ this.searchMusique.bind(this) } />
          <tbody>
          {
            this.props.musiques.map(musique => (
              <ListeMusiqueItem musique={ musique }
                                key={ musique.itunesId }
                                addMusiqueToPlaylist={ this.addMusiqueToPlaylist.bind(this) }
                                updateRating={ this.updateRating.bind(this) }
                                updateProperty={ this.updateProperty.bind(this) }
              />
            ))
          }
          </tbody>
        </table>
      </section>
    );
  }
}

ListeMusique.propTypes = {
  musiques: PropTypes.arrayOf(musiquePropType).isRequired
  // musiques: PropTypes.object.isRequired
};

export default connect(state => assign({}, {
  musiques: state.musiques
}), null)(ListeMusique);
