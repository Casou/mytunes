import {__SERVER_URL__} from "../../../../App";
import axios from "axios";

export const musiques = (state = { }, action) => {
  switch (action.type) {
    case "GET_ALL_MUSIQUES" :
      return action.payload;
    case "UPDATE_CLASSEMENT" :
      return state.map(m => updateClassementReducer(m, action.payload)).slice();
    case "UPDATE_PROPERTY" :
      return state.map(m => updatePropertyReducer(m, action)).slice();
    default :
      return state;
  }
};

const updateClassementReducer = (musique, action) => {
  if (musique.itunesId === action.itunesId) {
    const updatedMusique = { ...musique, classement : action.classement };
    console.log(updatedMusique);
    axios.put(__SERVER_URL__ + "musique", updatedMusique);
    return updatedMusique;
  }
  return musique;
};

const updatePropertyReducer = (musique, action) => {
  if (musique.itunesId === action.itunesId) {
    const musiqueUpdated = { ...musique };
    musiqueUpdated[action.property] = action.value;
    return musiqueUpdated;
  }
  return musique;
};