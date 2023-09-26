export const SET_USER_CONNECTED = 'SET_USER_CONNECTED';
export const setUserConnected = (bool) => ({
  type: SET_USER_CONNECTED,
  payload: {
    isUserConnected: bool,
  },
});

export const SET_USER = 'SET_USER';
export const setUser = (user) => ({
  type: SET_USER,
  payload: {
    user: user,
  },
});

export const SET_TOKEN = 'SET_TOKEN';
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: {
    token: token,
  },
});
