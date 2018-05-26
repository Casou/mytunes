
export default {
  setIsLoading: (isLoading) => (dispatch, getState) => {
    dispatch({
      type: "IS_APPLICATION_LOADING",
      payload: isLoading
    });
  }
}