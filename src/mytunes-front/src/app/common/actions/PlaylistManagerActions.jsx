import RequestUtil from "../util/RequestUtil";

export default {
    addMusiqueToPlaylist: (musique, playlist) => (dispatch, getState) => {
        if (playlist) {
            RequestUtil.put("playlist/musique", { playlist : { id : playlist.id }, musique : { id : musique.id } });
        }
        dispatch({
            type: "ADD_MUSIQUE_TO_PLAYLIST",
            payload: musique
        });
    },

    playMusique: (musique, addMusique) => (dispatch, getState) => {
        dispatch({
            type: "PLAYING_MUSIQUE",
            payload: {
                musique,
                addMusique
            }
        });
    },

    errorMusique: (musique) => (dispatch, getState) => {
        dispatch({
            type: "ERROR_MUSIQUE",
            payload: musique
        });
    },

    clearPlaylist: (playlist) => (dispatch, getState) => {
        if (playlist) {
            RequestUtil.put("playlist/clear", playlist);
        }
        dispatch({
            type: "CLEAR_PLAYLIST"
        });
    },

    toggleShuffle: () => (dispatch, getState) => {
        dispatch({
            type: "TOGGLE_SHUFFLE"
        });
    },

    reorderPlaylist: (oldIndex, newIndex) => (dispatch, getState) => {
        dispatch({
            type: "REORDER_PLAYLIST",
            payload: {
                oldIndex,
                newIndex
            }
        });
    },

    loadPlaylist: (playlist, allMusiques) => (dispatch, getState) => {
        const musiques = allMusiques.filter(musique => playlist.musiqueIds.includes(musique.id));
        dispatch({
            type : "LOAD_PLAYLIST",
            payload : { playlist, musiques }
        });
    },

    changePlaylistName: (name) => (dispatch, getState) => {
        dispatch({
            type : "CHANGE_PLAYLIST_NAME",
            payload : name
        });
    },

    setPlaylist: (playlist) => (dispatch, getState) => {
        dispatch({
            type : "SET_PLAYLIST",
            payload : playlist
        });
    },

    newPlaylist: (playlist) => (dispatch, getState) => {
        dispatch({
            type : "NEW_PLAYLIST",
            payload : playlist
        });
    }

}