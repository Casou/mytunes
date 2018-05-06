import {NotificationManager} from "react-notifications";
import ObjectUtil from "../util/ObjectUtil";

export const playlistManager = (state = {}, action) => {
    let playlistManager;
    switch (action.type) {
        case "ADD_MUSIQUE_TO_PLAYLIST" :
            playlistManager = state;
            NotificationManager.info("Musique ajoutée à la playlist", "Playlist", 1500);
            playlistManager.addMusique({...action.payload, alreadyPlayed: false});
            return ObjectUtil.clone(playlistManager);
        case "PLAYING_MUSIQUE" :
            playlistManager = state;
            playlistManager.setMusiquePlaying(action.payload);
            return ObjectUtil.clone(playlistManager);
        default :
            return state;
    }
};
