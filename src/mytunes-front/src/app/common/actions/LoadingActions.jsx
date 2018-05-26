export default {
    setIsApplicationLoading: (isLoading) => (dispatch, getState) => {
        dispatch({
            type: "IS_APPLICATION_LOADING",
            payload: isLoading
        });
    },

    setIsGeneralLoading: (isLoading) => (dispatch, getState) => {
        dispatch({
            type: "IS_GENERAL_LOADING",
            payload: isLoading
        });
    }

}