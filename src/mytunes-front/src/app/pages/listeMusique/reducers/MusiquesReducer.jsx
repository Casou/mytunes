export const musiques = (state = { }, action) => {
  switch (action.type) {
    case "GET_ALL_MUSIQUES" :
      console.log("GET_ALL_MUSIQUES", action.payload);
      return action.payload;
    case "UPDATE_CLASSEMENT" :
      return state.map(m => updateClassmentReducer(m, action));
    case "UPDATE_PROPERTY" :
      return state.map(m => updatePropertyReducer(m, action));
    default :
      return state;
  }
};

const updateClassmentReducer = (musique, action) => {
  if (musique.id === action.id) {
    return { ...musique, classement : action.classement };
  }
  return musique;
};

const updatePropertyReducer = (musique, action) => {
  if (musique.id === action.id) {
    const musiqueUpdated = { ...musique };
    musiqueUpdated[action.property] = action.value;
    return musiqueUpdated;
  }
  return musique;
};