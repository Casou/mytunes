import React from "react";
import PropTypes from "prop-types";
import {musiquePropType} from "../../../common/types/Musique";
import * as classnames from "classnames";

export const Classement = ({ musique, onChange, isFetching }) => {
    const stars = [0, 1, 2, 3, 4];
    const rating = musique.classement ? musique.classement / 20 : 0;
    // const className = classnames("rating", musique.isFetching["classement"] ? "fetching" : "");
    const className = classnames("rating", isFetching ? "fetching" : "");
    
    return (
      <div className={ className }>
        {stars.map(star => (
          <span key={"classement_" + musique.itunesId + "_star_" + star}
                className={"ratingStar"}
                onClick={ () => onChange((star + 1) * 20) }>
                {star >= rating ? "☆" : "★"}
            </span>
        ))
        }
      </div>
    );
};

Classement.propTypes = {
  musique : musiquePropType.isRequired,
  onChange : PropTypes.func.isRequired,
  isFetching : PropTypes.bool
};

export default Classement;
