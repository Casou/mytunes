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
                NotificationManager.warning("Musique " + newMusique.titre + " déjà présent dans la playlist", "Playlist", 25000);
            } else {
                NotificationManager.info("Musique ajoutée à la playlist", "Playlist", 150000);
            }
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
