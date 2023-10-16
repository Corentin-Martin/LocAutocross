import {
  SET_CONVERSATIONS,
  SET_MAIN_HEIGHT, SET_RESET_TOKEN, SET_TOKEN, SET_USER, SET_USER_CONNECTED,
} from '../actions/user';

const initialState = {
  isUserConnected: false,
  statusMatching: {
    0: ['Brouillon', '#fff'],
    1: ['Disponible', '#00FF00'],
    2: ['Interessé', '#FFFF00'],
    3: ['En cours de réservation', '#ff8000'],
    4: ['Réservation validée', '#FF0000'],
    5: ['Archivé', '#fff'],
    6: ['Evenement annulé', '#808080'],
  },
  user: null,
  token: null,
  mainHeight: null,
  resetToken: null,
  conversations: {
    unread: [],
    read: [],
  },
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER_CONNECTED:
      return {
        ...state,
        isUserConnected: action.payload.isUserConnected,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };

    case SET_MAIN_HEIGHT:
      return {
        ...state,
        mainHeight: action.payload.mainHeight,
      };

    case SET_RESET_TOKEN:
      return {
        ...state,
        resetToken: action.payload.resetToken,
      };

    case SET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload.conversations,
      };
    default:
      return state;
  }
}

export default reducer;
