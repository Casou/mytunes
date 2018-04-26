import React from "react";
import {musiquePropType} from "../../../common/types/Musique";
import {assign} from "lodash";
import {bindActionCreators} from "redux";
import MusiquesActions from "../actions/MusiquesActions";
import {connect} from "react-redux";

class Classement extends React.Component {
  
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
  }
  
  render() {
    const stars = [0, 1, 2, 3, 4];
    const rating = this.props.musique.classement ? this.props.musique.classement / 20 : 0;
    return (
      <div className={"rating"}>
        {stars.map(star => (
          <span key={"classement_" + this.props.musique.itunesId + "_star_" + star}
                className={"ratingStar"}
                onClick={() => this.props.musiquesActions.updateClassement(this.props.musique, (star + 1) * 20)}>
                {star >= rating ? "☆" : "★"}
            </span>
        ))
        }
      </div>
    );
  }
};

Classement.propTypes = {
  musique : musiquePropType.isRequired
};

export default connect(null,
  dispatch => ({
    musiquesActions: bindActionCreators(MusiquesActions, dispatch)
  }))(Classement);
