import React from 'react';
import PropTypes from 'prop-types';
import ListeMusiqueHeader from "./ListeMusiqueHeader";
import ListeMusiqueItem from "./ListeMusiqueItem";

export const ListeMusique = (props) => (
  <section className="listeMusiques">
    <table>
      <thead>
      <ListeMusiqueHeader />
      </thead>
      <tbody>
      {
        props.musiques.map(musique => (
          <ListeMusiqueItem musique={ musique }
                            key={ musique.itunesId }
                            addMusiqueToPlaylist={ () => alert("Click up " + musique.itunesId) } />
        ))
      }
      </tbody>
    </table>
  </section>
);

ListeMusique.propTypes = {
  musiques: PropTypes.array.isRequired
};

export default ListeMusique;