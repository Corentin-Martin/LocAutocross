import { SET_OPEN_CREATION } from '../actions/dashboard';

const initialState = {
  isOpenCreationModal: true,

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

    case SET_OPEN_CREATION:
      return {
        ...state,
        isOpenCreationModal: action.payload.isOpenCreationModal,
      };

    default:
      return state;
  }
}

export default reducer;
