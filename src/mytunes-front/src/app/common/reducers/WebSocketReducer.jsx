export const wsClient = (state = { }, action) => {
    console.log("Reducer", action.type, action.payload);
    switch (action.type) {
      case "SET_WEBSOCKET" :
      return action.payload;
    default :
      return state;
  }
};
