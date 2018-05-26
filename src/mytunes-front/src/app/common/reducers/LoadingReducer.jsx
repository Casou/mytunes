export const isLoading = (state = {}, action) => {
    switch (action.type) {
        case "IS_APPLICATION_LOADING" :
            return {
                ...state,
                application: action.payload
            };
        case "IS_GENERAL_LOADING" :
            return {
                ...state,
                general: action.payload
            };
        default :
            return state;
    }
};
