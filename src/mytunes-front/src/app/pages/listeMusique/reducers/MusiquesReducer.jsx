export const musiques = (stateMusiques = { }, action) => {
  switch (action.type) {
    case "GET_ALL_MUSIQUES" :
      return mapMusiques(action.payload);
    case "UPDATE_MUSIQUE" :
      // return updateMusiqueReducer(stateMusiques, action.payload);
      return updateMusiqueReducer(stateMusiques, action.payload);
    default :
      return stateMusiques;
  }
};

const mapMusiques = (musiques) => {
  // const musiqueArray = [];
  // musiques.forEach(musique => {
  //   musiqueArray[musique.itunesId] = { ...musique,
  //     isFetching : [],
  //     searchText : [musique.titre === null ? "" : musique.titre.toLowerCase(),
  //       musique.artiste === null ? "" : musique.artiste.toLowerCase(),
  //       musique.commentaire === null ? "" : musique.commentaire.toLowerCase()].join(" ")
  //   };
  // });
  //
  // return musiqueArray;
  
  return musiques.map(musique => {
    return { ...musique,
            isFetching : [],
            searchText : [musique.titre.toLowerCase(),
                          musique.artiste.toLowerCase(),
                          musique.commentaire.toLowerCase()].join(" ")
    }
  });
};

const updateMusiqueReducer = (musiques, payload) => {
  const newMusiques = musiques.slice();
  newMusiques[payload.itunesId] = payload;
  return newMusiques;
  // {
  //   ...musiques,
  //   [payload.itunesId] : payload
  // };
};
