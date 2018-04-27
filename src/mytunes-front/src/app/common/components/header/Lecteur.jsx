import React from 'react';
import PropTypes from "prop-types";

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