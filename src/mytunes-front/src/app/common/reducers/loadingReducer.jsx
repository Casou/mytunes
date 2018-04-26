export const isLoading = (state = { }, action) => {
  console.log("Loading Reducer", action);
  switch (action.type) {
    case "IS_LOADING" :
      return action.payload;
    default :
      return state;
  }
};
