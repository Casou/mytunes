import React, { Component } from 'react';

export default class ListeMusiqueHeader extends Component {
  render() {
    return (
      <tr>
        <th> </th>
        <th>Titre</th>
        <th>Artiste</th>
        <th>Durée</th>
        <th>BPM</th>
        <th>Genre</th>
        <th>Classement</th>
        <th>Commentaire</th>
      </tr>
    );
  }
}