import {NotificationManager} from "react-notifications";
import ObjectUtil from "../util/ObjectUtil";

export const playlistManager = (state = {}, action) => {
    let playlistManager = state;
    switch (action.type) {
        case "ADD_MUSIQUE_TO_PLAYLIST" :
            const newMusique = action.payload;
            const alreadyPresent = playlistManager.musiques.map(musique => musique.id).includes(newMusique.id);
            playlistManager.addMusique({...newMusique, alreadyPlayed: false});
            if (alreadyPresent) {
                NotificationManager.warning("Musique " + newMusique.titre + " déjà présent dans la playlist", "Playlist", 2000);
            } else {
                NotificationManager.info("Musique ajoutée à la playlist", "Playlist", 1500);
            }
            return ObjectUtil.clone(playlistManager);
        case "PLAYING_MUSIQUE" :
            playlistManager.setMusiquePlaying(action.payload.musique, action.payload.addMusique);
            return ObjectUtil.clone(playlistManager);
        case "ERROR_MUSIQUE" :
            playlistManager.setMusiqueError(action.payload);
            return ObjectUtil.clone(playlistManager);
        case "CLEAR_PLAYLIST" :
            playlistManager.clearPlaylist();
            return ObjectUtil.clone(playlistManager);
        case "TOGGLE_SHUFFLE" :
            playlistManager.toggleShuffle();
            return ObjectUtil.clone(playlistManager);
        case "REORDER_PLAYLIST" :
            playlistManager = playlistManager.reorderMusique(action.payload.oldIndex, action.payload.newIndex);
            return ObjectUtil.clone(playlistManager);
        case "LOAD_PLAYLIST" :
            playlistManager.loadPlaylist(action.payload.playlist, action.payload.musiques);
            return ObjectUtil.clone(playlistManager);
        case "NEW_PLAYLIST" :
            playlistManager.newPlaylist();
            return ObjectUtil.clone(playlistManager);
        case "CHANGE_PLAYLIST_NAME" :
            playlistManager.updatePlaylistName(action.payload);
            return ObjectUtil.clone(playlistManager);
        case "SET_PLAYLIST" :
            playlistManager.setPlaylist(action.payload);
            return ObjectUtil.clone(playlistManager);
        default :
            return state;
    }
};
