import React from "react";
import PropTypes from "prop-types";
import {musiquePropType} from "../../../common/types/Musique";

export const Classement = props => {
  const stars = [0, 1, 2, 3, 4];
  const rating = props.musique.classement ? props.musique.classement / 20 : 0;
  return (
    <div className={ "rating" }>
        { stars.map(star => (
          <span key={ "classement_" + props.musique.itunesId + "_star_" + star }
                className={ "ratingStar" }
                onClick={ () => props.updateRating(star + 1, props.musique) }>
              { star >= rating ? "☆" : "★" }
          </span>
        ))
        }
      </div>
  );
};

Classement.propTypes = {
  musique : musiquePropType.isRequired,
  updateRating : PropTypes.func.isRequired
};

export default Classement;