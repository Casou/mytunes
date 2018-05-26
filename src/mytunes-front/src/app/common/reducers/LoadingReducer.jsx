export const isLoading = (state = { }, action) => {
  switch (action.type) {
    case "IS_APPLICATION_LOADING" :
      return action.payload;
    default :
      return state;
  }
};
