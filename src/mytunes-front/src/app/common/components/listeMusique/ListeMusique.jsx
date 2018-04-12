import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListeMusiqueHeader from "./ListeMusiqueHeader";
import ListeMusiqueItem from "./ListeMusiqueItem";

export default class ListeMusique extends Component {
  render() {
    return (
      <section className="listeMusiques">
        <table>
          <thead>
            <ListeMusiqueHeader />
          </thead>
          <tbody>
            {
              this.props.musiques.map(musique => (
                <ListeMusiqueItem musique={ musique } key={ musique.itunesId } />
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}

ListeMusique.propTypes = {
  musiques:PropTypes.array.isRequired
};