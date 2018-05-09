import {__SERVER_URL__} from "../../../App";

export default {
    getGenres: () => (dispatch, getState) => {
        return fetch(__SERVER_URL__ + "genres") //, { mode: 'no-cors' })
            .then(response => response.json())
            .then(genres => {
                dispatch({
                    type : "GET_GENRES",
                    payload : genres
                });
            })
            .catch(e => {
                console.error(e);
            });
    }
}