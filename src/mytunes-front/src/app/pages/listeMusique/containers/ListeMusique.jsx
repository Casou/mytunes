import React from 'react';
import ListeMusiqueHeader from "../components/ListeMusiqueHeader";
import ListeMusiqueItem from "../components/ListeMusiqueItem";
import { __SERVER_URL__ } from "/App";

export default class ListeMusique extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      musiques : []
    }
  }
  
  updateRating = (rating, musique) => {
    alert(musique.titre + " : new rating = " + rating);
  };
  
  addMusiqueToPlaylist = (musique) => {
    alert("addMusiqueToPlaylist " + musique.titre);
  };
  
  componentDidMount() {
    fetch(__SERVER_URL__ + "all-musiques") //, { mode: 'no-cors' })
    .then(response => response.json())
    .then(musiqueList => {
      this.setState({
        ...this.state,
        musiques : musiqueList
      });
    })
    .catch(e => {
      console.error(e);
    });
  }
  
  render() {
    return (
      <section className="listeMusiques">
        <table>
          <thead>
          <ListeMusiqueHeader />
          </thead>
          <tbody>
          {
            this.state.musiques.map(musique => (
              <ListeMusiqueItem musique={ musique }
                                key={ musique.itunesId }
                                addMusiqueToPlaylist={ this.addMusiqueToPlaylist.bind(this) }
                                updateRating={ this.updateRating.bind(this) }/>
            ))
          }
          </tbody>
        </table>
      </section>
    );
  }
};

ListeMusique.propTypes = {
};
