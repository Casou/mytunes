import {__SERVER_URL__} from "../../../../App";
import RequestUtil from "../../../common/util/RequestUtil";
import { NotificationManager } from "react-notifications";

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
        const playlistToUpdate = {id, nom};
        return RequestUtil.put("playlist/nom", playlistToUpdate)
            .then(() => {
                dispatch({
                    type : "UPDATE_PLAYLIST_NAME",
                    payload : playlistToUpdate
                });
            });
    },

    updateMusiqueOrder: (idPlaylist, musiques) => (dispatch, getState) => {
        const playlistNewMusiqueOrder = {
            id : idPlaylist,
            musiquesOrderIds : musiques.map(musique => musique.id)
        };

        return RequestUtil.put("playlist/order", playlistNewMusiqueOrder)
            .then(() => {
                dispatch({
                    type : "UPDATE_PLAYLIST_MUSIQUE_ORDER",
                    payload : playlistNewMusiqueOrder
                });
            });
    },

    deletePlaylistMusique: (idPlaylist, idMusique) => (dispatch, getState) => {
        return RequestUtil.delete("playlist/musique",
            {
                id : idPlaylist,
                musiqueIds : [idMusique]
            });
    },

    savePlaylist: (playlistToSave) => (dispatch, getState) => {
        return RequestUtil.put("playlist", playlistToSave)
            .then((response) => {
                NotificationManager.info("Playlist " + playlistToSave.nom + " sauvegardée.")

                if (!playlistToSave.id || response.id !== playlistToSave.id) {
                    dispatch({
                        type : "NEW_PLAYLIST_SAVED",
                        payload : response.data
                    });
                }
                return response.data;
            });
    },

    sortPlaylistTree: (playlistTree) => (dispatch, getState) => {
        return RequestUtil.put("playlist/tree", playlistTree);
    },

    deletePlaylist: (playlist) => (dispatch, getState) => {
        return RequestUtil.delete("playlist", playlist);
    }

};