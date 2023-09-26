import { SET_USER_CONNECTED } from '../actions/user';

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

    default:
      return state;
  }
}

export default reducer;
