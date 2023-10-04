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

export const SET_MAIN_HEIGHT = 'SET_MAIN_HEIGHT';
export const setMainHeight = (height) => ({
  type: SET_MAIN_HEIGHT,
  payload: {
    mainHeight: height,
  },
});

export const SET_RESET_TOKEN = 'SET_RESET_TOKEN';
export const setResetToken = (token) => ({
  type: SET_RESET_TOKEN,
  payload: {
    resetToken: token,
  },
});
