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
    }

}