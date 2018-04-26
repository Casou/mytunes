import {__SERVER_URL__} from "../../../../App";

export default {
  
  getAllMusiques: () => (dispatch, getState) => {
    fetch(__SERVER_URL__ + "all-musiques") //, { mode: 'no-cors' })
    .then(response => response.json())
    .then(musiques => {
      dispatch({
        type : "GET_ALL_MUSIQUES",
        payload : musiques
      });
      // this.setState({
      //   ...this.state,
      //   musiques
      // });
    })
    .catch(e => {
      console.error(e);
    });
  }
  
};