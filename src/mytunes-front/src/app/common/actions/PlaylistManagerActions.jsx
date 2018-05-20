export default {
    addMusiqueToPlaylist: (musique) => (dispatch, getState) => {
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

    clearPlaylist: () => (dispatch, getState) => {
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
    }

}