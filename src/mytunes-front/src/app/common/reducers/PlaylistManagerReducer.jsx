import {NotificationManager} from "react-notifications";
import ObjectUtil from "../util/ObjectUtil";
import {__LOCAL_STORAGE__PLAYLIST_MANAGER__} from "../../../App";

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
            break;
        case "PLAYING_MUSIQUE" :
            playlistManager.setMusiquePlaying(action.payload.musique, action.payload.addMusique);
            break;
        case "CLEAR_MUSIQUE" :
            playlistManager.setMusiquePlaying(null, false);
            break;
        case "ERROR_MUSIQUE" :
            playlistManager.setMusiqueError(action.payload);
            break;
        case "CLEAR_PLAYLIST" :
            playlistManager.clearPlaylist();
            break;
        case "TOGGLE_SHUFFLE" :
            playlistManager.toggleShuffle();
            break;
        case "REORDER_PLAYLIST" :
            playlistManager = playlistManager.reorderMusique(action.payload.oldIndex, action.payload.newIndex);
            break;
        case "LOAD_PLAYLIST" :
            playlistManager.loadPlaylist(action.payload.playlist, action.payload.musiques);
            break;
        case "NEW_PLAYLIST" :
            playlistManager.newPlaylist();
            break;
        case "CHANGE_PLAYLIST_NAME" :
            playlistManager.updatePlaylistName(action.payload);
            break;
        case "SET_PLAYLIST" :
            playlistManager.setPlaylist(action.payload);
            break;
        default :
            return state;
    }

    const newState = ObjectUtil.clone(playlistManager);
    localStorage.setItem(__LOCAL_STORAGE__PLAYLIST_MANAGER__,
        JSON.stringify(newState, (key, value) => {
            if (key === "parent") {
                return;
            }
            return value;
        }));
    return newState;
};
