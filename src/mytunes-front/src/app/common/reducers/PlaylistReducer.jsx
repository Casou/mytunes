import { NotificationManager } from "react-notifications";

export const playlist = (state = { }, action) => {
  switch (action.type) {
    case "ADD_MUSIQUE_TO_PLAYLIST" :
      NotificationManager.info("Musique ajoutée à la playlist", "Playlist", 1500);
      return [...state, {...action.payload, alreadyPlayed : false}];
    default :
      return state;
  }
};
