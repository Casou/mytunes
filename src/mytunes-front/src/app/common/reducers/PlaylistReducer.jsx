import {NotificationManager} from "react-notifications";

export const playlist = (state = {}, action) => {
    switch (action.type) {
        case "ADD_MUSIQUE_TO_PLAYLIST" :
            NotificationManager.info("Musique ajoutée à la playlist", "Playlist", 1500);
            return {
                ...state,
                musiques: [...state.musiques,
                    {...action.payload, alreadyPlayed: false}
                ]
            };
        case "PLAYING_MUSIQUE" :
            const musiquePlaying = action.payload;
            const musiques = [...state.musiques ];
            let found = false;
            for (let musique of musiques) {
                if (musiquePlaying.itunesId === musique.itunesId) {
                    found = true;
                    musique.alreadyPlayed = false;
                } else {
                    musique.alreadyPlayed = !found;
                }
            }
            return {
                ...state,
                musiques,
                musiquePlaying
            };
        default :
            return state;
    }
};
