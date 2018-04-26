import React from "react";
import MusiquesActions from "../listeMusique/actions/MusiquesActions";
import {assign} from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class InitApp extends React.Component {
  
  componentDidMount() {
    this.props.musiquesActions.getAllMusiques();
  }
  
  render() {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default connect(null,
  dispatch => ({
  musiquesActions: bindActionCreators(MusiquesActions, dispatch)
}))(InitApp);

//     dispatch => ({
//   globalActions: bindActionCreators(GlobalActions, dispatch)
// })
