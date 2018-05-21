import {__SERVER_URL__} from "../../../../App";
import RequestUtil from "../../../common/util/RequestUtil";

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

    updatePlaylistNom: (id, nom) => (dispatch, getState) => {
        return RequestUtil.put("playlist/nom", {id, nom});
    },

    updateMusiqueOrder: (idPlaylist, musiques) => (dispatch, getState) => {
        return RequestUtil.put("playlist/order",
            {
                id : idPlaylist,
                musiquesOrder : musiques.map((musique, index) => {
                    return { order : index, musique : { id : musique.id } };
                })
            });
    },

    deletePlaylistMusique: (idPlaylist, idMusique) => (dispatch, getState) => {
        return RequestUtil.delete("playlist/musique",
            {
                id : idPlaylist,
                musiqueIds : [idMusique]
            });
    },

};