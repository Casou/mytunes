export const musiquesReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_MUSIQUES" :
      return {
        ...state,
        musiques : action.payload
      };
      case "UPDATE_CLASSEMENT" :
      return {
        ...state,
        musiques : state.musiques.map(m => updateClassmentReducer(m, action))
      };
    case "UPDATE_PROPERTY" :
      return {
        ...state,
        musiques : state.musiques.map(m => updateClassmentReducer(m, action))
      };
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