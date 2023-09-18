import { SET_USER_CONNECTED } from '../actions/user';

const initialState = {
  isUserConnected: false,
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
