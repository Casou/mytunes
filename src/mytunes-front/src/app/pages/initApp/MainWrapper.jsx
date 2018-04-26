import React from "react";
import MusiquesActions from "../listeMusique/actions/MusiquesActions";
import LoadingActions from "../../common/actions/LoadingActions";
import {assign} from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {RefreshIndicator} from "material-ui";

class MainWrapper extends React.Component {
  
  componentDidMount() {
    this.props.musiquesActions.getAllMusiques();
  }
  
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (this.props.isLoading && nextProps.isLoading && this.isApplicationLoaded(nextProps)) {
      this.props.loadingActions.setIsLoading(false);
    }
  }
  
  render() {
    return (
      <main style={{position: 'relative'}}>
        { this.props.isLoading ?
        <RefreshIndicator
          size={70}
          left={-35}
          top={35}
          loadingColor="#808080"
          status="loading"
          style={{ marginLeft : '50%'}}
        />
          :
          this.props.children
        }
      </main>
    )
  }
  
  isApplicationLoaded(nextProps) {
    return nextProps.musiques.length;
  }
}

export default connect(state => assign({}, {
    musiques: state.musiques,
    isLoading: state.isLoading
  }),
  dispatch => ({
    musiquesActions: bindActionCreators(MusiquesActions, dispatch),
    loadingActions: bindActionCreators(LoadingActions, dispatch)
}))(MainWrapper);

//     dispatch => ({
//   globalActions: bindActionCreators(GlobalActions, dispatch)
// })
