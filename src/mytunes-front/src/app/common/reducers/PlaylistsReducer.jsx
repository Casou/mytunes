import PlaylistProvider from "../beans/PlaylistProvider";

export const playlistProvider = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_PLAYLISTS" :
            return new PlaylistProvider(action.payload);
        default :
            return state;
    }
};
