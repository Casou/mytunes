import {__SERVER_URL__} from "../../../../App";
import RequestUtil from "../../../common/util/RequestUtil";

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
  },
  
  updateMusique: (musique, property, value) => (dispatch, getState) => {
    // dispatch({
    //   type : "FETCH_MUSIQUE",
    //   payload : { ...musique, isFetching : { ...musique.isFetching, [property] : true } }
    // });
    
    const updatedMusique = { ...musique, [property] : value };
    return RequestUtil.put("musique", updatedMusique)
    .then(() => {
      dispatch({
        type : "UPDATE_MUSIQUE",
        payload : updatedMusique
      });
    })
    .catch(() => {
      // dispatch({
      //   type : "FETCH_MUSIQUE",
      //   payload : { ...musique, isFetching : { ...musique.isFetching, [property] : false } }
      // });
    });
    
  }
  
};