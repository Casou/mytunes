import {NotificationManager} from "react-notifications";
import ObjectUtil from "../util/ObjectUtil";

export const playlistManager = (state = {}, action) => {
    let playlistManager = state;
    switch (action.type) {
        case "ADD_MUSIQUE_TO_PLAYLIST" :
            NotificationManager.info("Musique ajoutée à la playlist", "Playlist", 1500);
            playlistManager.addMusique({...action.payload, alreadyPlayed: false});
            break;
        case "PLAYING_MUSIQUE" :
            playlistManager.setMusiquePlaying(action.payload.musique, action.payload.addMusique);
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
        default :
            return state;
    }
    return ObjectUtil.clone(playlistManager);
};
