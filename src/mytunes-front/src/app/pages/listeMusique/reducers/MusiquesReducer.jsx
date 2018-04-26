export const musiques = (state = { }, action) => {
  switch (action.type) {
    case "GET_ALL_MUSIQUES" :
      return mapMusiques(action.payload);
    case "FETCH_MUSIQUE" :
      return state.map(m => updateFetchReducer(m, action.payload)).slice();
    case "UPDATE_MUSIQUE" :
      return state.map(m => updateMusiqueReducer(m, action.payload)).slice();
    default :
      return state;
  }
};

const mapMusiques = (musiques) => {
  return musiques.map(musique => { return { ...musique, isFetching : [] } });
}

const updateFetchReducer = (musique, payload) => {
  if (musique.itunesId === payload.itunesId) {
    return payload;
  }
  return musique;
};

const updateMusiqueReducer = (musique, payload) => {
  if (musique.itunesId === payload.itunesId) {
    payload.isFetching["classement"] = false;
    return payload;
  }
  return musique;
};

// const updatePropertyReducer = (musique, action) => {
//   if (musique.itunesId === action.itunesId) {
//     const musiqueUpdated = { ...musique };
//     musiqueUpdated[action.property] = action.value;
//     return musiqueUpdated;
//   }
//   return musique;
// };