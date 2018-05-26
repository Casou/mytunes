import PlaylistProvider from "../beans/PlaylistProvider";

export const playlistProvider = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_PLAYLISTS" :
            return new PlaylistProvider(action.payload);
        case "NEW_PLAYLIST_SAVED" :
            const playlists = state.getPlaylists();
            const playlistToAdd = action.payload;
            playlists.push(playlistToAdd);
            if (playlistToAdd.parentId) {
                playlists.filter(pl => pl.id === playlistToAdd.parentId)[0].childrenIds.push(playlistToAdd.id);
            }
            return new PlaylistProvider(playlists);
        default :
            return state;
    }
};
