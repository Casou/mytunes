import PlaylistProvider from "../beans/PlaylistProvider";

export const playlistProvider = (state = {}, action) => {
    let playlists;
    switch (action.type) {
        case "GET_ALL_PLAYLISTS" :
            return new PlaylistProvider(action.payload);
        case "NEW_PLAYLIST_SAVED" :
            playlists = state.getPlaylists();
            const playlistToAdd = action.payload;
            const playlistFiltered = playlists.filter(pl => playlistToAdd.id === pl.id);

            if (playlistFiltered.length) {
                const playlistFound = playlistFiltered[0];
                const playlistIndex = playlists.indexOf(playlistFound);

                playlistFound.nom = playlistToAdd.nom;
                playlistFound.parentId = playlistToAdd.parentId;
                playlists[playlistIndex] = playlistFound;
            } else {
                playlists.push(playlistToAdd);
                if (playlistToAdd.parentId) {
                    playlists.filter(pl => pl.id === playlistToAdd.parentId)[0].childrenIds.push(playlistToAdd.id);
                }
            }

            return new PlaylistProvider(playlists);
        case "UPDATE_PLAYLIST_NAME" :
            playlists = state.getPlaylists();
            const playlistToUpdate = action.payload;
            playlists.filter(pl => pl.id === playlistToUpdate.id)[0].nom = playlistToUpdate.nom;
            return new PlaylistProvider(playlists);
        case "UPDATE_PLAYLIST_MUSIQUE_ORDER" :
            playlists = state.getPlaylists();
            const playlistMusiqueToUpdate = action.payload;
            playlists.filter(pl => pl.id === playlistMusiqueToUpdate.id)[0].musiquesOrderIds = playlistMusiqueToUpdate.musiquesOrderIds;
            return new PlaylistProvider(playlists);
        default :
            return state;
    }
};
