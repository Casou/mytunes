import React from "react";
import {musiquePropType} from "../../../common/types/Musique";
import {assign, isEqual} from "lodash";
import {bindActionCreators} from "redux";
import MusiquesActions from "../actions/MusiquesActions";
import {connect} from "react-redux";
import * as classnames from "classnames";

class Classement extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isFetching : this.props.musique.isFetching["classement"],
      value : this.props.musique.classement
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.musique, nextProps.musique)) {
      this.setState({
        ...this.state,
        isFetching : nextProps.musique.isFetching["classement"],
        value : nextProps.musique.classement
      });
    }
  }
  
  updateClassement(nbEtoiles) {
    const { isFetching } = this.state;
    const { musique, musiquesActions } = this.props;
    
    if (!isFetching) {
      musiquesActions.updateMusique(musique, "classement", nbEtoiles * 20);
    }
  }
  
  render() {
    const { value, isFetching } = this.state;
    const { musique } = this.props;
    
    const stars = [0, 1, 2, 3, 4];
    const rating = value ? value / 20 : 0;
    const className = classnames("rating", isFetching ? "fetching" : "");
    
    return (
      <div className={ className }>
        {stars.map(star => (
          <span key={"classement_" + musique.itunesId + "_star_" + star}
                className={"ratingStar"}
                onClick={ () => this.updateClassement(star + 1) }>
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
