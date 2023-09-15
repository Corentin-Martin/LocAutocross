export const SET_USER_CONNECTED = 'SET_USER_CONNECTED';
export const setUserConnected = (bool) => ({
  type: SET_USER_CONNECTED,
  payload: {
    isUserConnected: bool,
  },
});
