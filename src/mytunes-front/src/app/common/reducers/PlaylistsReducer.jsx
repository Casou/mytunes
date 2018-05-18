export const playlists = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_PLAYLISTS" :
            return action.payload;
        default :
            return state;
    }
};
