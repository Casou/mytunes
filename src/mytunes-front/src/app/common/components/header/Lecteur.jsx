import React from 'react';
import PropTypes from "prop-types";
import FontIcon from 'material-ui/FontIcon';
import { IconButton } from "material-ui";

export const Lecteur = (props) => (
  <section className="lecteur">
    <div className="lecteurDiv">
      <h1>{ props.titre ? props.titre : "Aucun titre" }</h1>
      <h2>{ props.artiste ? props.artiste : "-" }</h2>
    </div>
  </section>
);

Lecteur.propTypes = {
  titre:PropTypes.string,
  artiste:PropTypes.string
};

export default Lecteur;