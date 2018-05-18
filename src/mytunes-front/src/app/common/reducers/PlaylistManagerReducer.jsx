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
            return ObjectUtil.clone(playlistManager);
        case "PLAYING_MUSIQUE" :
            playlistManager.setMusiquePlaying(action.payload.musique, action.payload.addMusique);
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
        default :
            return state;
    }
};
