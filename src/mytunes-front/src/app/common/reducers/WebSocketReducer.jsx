export const wsClient = (state = { }, action) => {
    switch (action.type) {
      case "SET_WEBSOCKET" :
      return action.payload;
    default :
      return state;
  }
};
