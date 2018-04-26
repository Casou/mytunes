
export default {
  setIsLoading: (isLoading) => (dispatch, getState) => {
    dispatch({
      type: "IS_LOADING",
      payload: isLoading
    });
  }
}