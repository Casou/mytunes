export default {
    setWsClient: (wsClient) => (dispatch, getState) => {
        return dispatch({
            type : "SET_WEBSOCKET",
            payload : wsClient
        });
    }
}