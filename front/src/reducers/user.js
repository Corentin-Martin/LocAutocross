import {
  SET_MAIN_HEIGHT, SET_TOKEN, SET_USER, SET_USER_CONNECTED,
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
  },
  user: null,
  token: null,
  mainHeight: null,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    /*
    Exemple d'action
    case SET_CONNECTED_USER:
      return {
        ...state,
        connectedUser: action.payload.connectedUser,
      };
    */

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

    default:
      return state;
  }
}

export default reducer;
