import {__SERVER_URL__} from "../../../../App";

export default {

    getAllPlaylists: () => (dispatch, getState) => {
        return fetch(__SERVER_URL__ + "playlists") //, { mode: 'no-cors' })
            .then(response => response.json())
            .then(playlists => {
                dispatch({
                    type : "GET_ALL_PLAYLISTS",
                    payload : playlists
                });
            })
            .catch(e => {
                console.error(e);
            });
    },

};