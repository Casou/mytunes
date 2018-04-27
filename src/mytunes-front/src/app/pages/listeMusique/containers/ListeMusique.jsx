import React from 'react';
import PropTypes from "prop-types";
import ListeMusiqueHeader from "../components/ListeMusiqueHeader";
import ListeMusiqueItem from "../components/ListeMusiqueItem";
import { musiquePropType } from "../../../common/types/Musique";
import { connect } from "react-redux";
import { assign } from "lodash";


// class ListeMusique extends React.Component {
class ListeMusique extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchText : ''
    };
  }
  
  updateRating (rating, musique) {
      console.log(musique.titre + " : new rating = " + rating);
      
      // const payload = {
      //   musique: musique,
      //   newClassement: rating
      // };
      // axios.put(__SERVER_URL__ + "/classement", payload);
  
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
    this.setState({
      ...this.state,
      searchText : text
    });
  }
  
  getFilteredMusiques() {
    const { searchText } = this.state;
    const { musiques } = this.props;
    
    if (searchText) {
      return musiques.filter(musique => musique.searchText.indexOf(searchText.toLowerCase()) >= 0);
    }
    return musiques;
  }
  
  render() {
    let filteredMusiques = [];
    if (this.props.musiques) {
      filteredMusiques = this.getFilteredMusiques();
    }
    
    return (
      <section className="listeMusiques">
        <table>
          <ListeMusiqueHeader onSearch={ this.searchMusique.bind(this) } />
          <tbody>
          {
            filteredMusiques.map(musique => (
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
};

export default connect(state => assign({}, {
  musiques: state.musiques
}), null)(ListeMusique);
