import {__SERVER_URL__} from "../../../../App";

export default {
  
  getAllMusiques: () => (dispatch, getState) => {
    return fetch(__SERVER_URL__ + "all-musiques") //, { mode: 'no-cors' })
      .then(response => response.json())
      .then(musiques => {
        dispatch({
          type : "GET_ALL_MUSIQUES",
          payload : musiques
        });
      })
      .catch(e => {
        console.error(e);
      });
  }
  
};