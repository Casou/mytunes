export const musiques = (stateMusiques = {}, action) => {
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
    // musiquesOrder.forEach(musique => {
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
        return {
            ...musique,
            isFetching: [],
            searchText: [musique.titre ? musique.titre.toLowerCase() : "",
                musique.artiste ? musique.artiste.toLowerCase() : "",
                musique.commentaire ? musique.commentaire.toLowerCase() : ""].join(" ")
        }
    });
};

const updateMusiqueReducer = (musiques, payload) => {
    // const newMusiques = musiquesOrder.slice();
    // newMusiques[payload.id] = payload;
    // return newMusiques;

    const musiquesModified = [...musiques];
    const indexMusique = musiquesModified.findIndex(musique => musique.id === payload.id);
    musiquesModified[indexMusique] = payload;

    return musiquesModified;

    // {
    //   ...musiquesOrder,
    //   [payload.itunesId] : payload
    // };
};
