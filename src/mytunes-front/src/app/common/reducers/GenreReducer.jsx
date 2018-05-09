export const genres = (state = { }, action) => {
  switch (action.type) {
    case "GET_GENRES" :
      return action.payload;
        // return action.payload.reduce(function(map, obj) {
        //     map[obj.id] = obj;
        //     return map;
        // }, {});
    default :
      return state;
  }
};
