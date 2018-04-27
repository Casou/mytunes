export const musiques = (stateMusiques = { }, action) => {
  switch (action.type) {
    case "GET_ALL_MUSIQUES" :
      return mapMusiques(action.payload);
    case "UPDATE_MUSIQUE" :
      // return updateMusiqueReducer(stateMusiques, action.payload);
      console.log({
        ...stateMusiques,
        [action.payload.itunesId] : action.payload
      });
      return {
        ...stateMusiques,
        [action.payload.itunesId] : action.payload
      };
    default :
      return stateMusiques;
  }
};

const mapMusiques = (musiques) => {
  const musiqueArray = {};
  musiques.forEach(musique => {
    musiqueArray[musique.itunesId] = { ...musique,
      isFetching : [],
      searchText : [musique.titre.toLowerCase(),
        musique.artiste.toLowerCase(),
        musique.commentaire.toLowerCase()].join(" ")
    };
  });
  
  return musiqueArray;
  
  // return musiques.map(musique => {
  //   return { ...musique,
  //           isFetching : [],
  //           searchText : [musique.titre.toLowerCase(),
  //                         musique.artiste.toLowerCase(),
  //                         musique.commentaire.toLowerCase()].join(" ")
  //   }
  // });
};

const updateMusiqueReducer = (musiques, payload) => {
  const newMusiques = musiques.slice();
  newMusiques[payload.itunesId] = { ...payload,
    isFetching : { ...payload.isFetching, "classement" : false }
  };
  return newMusiques;
  
  // if (musique.itunesId === payload.itunesId) {
  //   payload.isFetching["classement"] = false;
  //   return payload;
  // }
  // return musique;
};

// const updatePropertyReducer = (musique, action) => {
//   if (musique.itunesId === action.itunesId) {
//     const musiqueUpdated = { ...musique };
//     musiqueUpdated[action.property] = action.value;
//     return musiqueUpdated;
//   }
//   return musique;
// };