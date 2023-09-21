import { SET_OPEN_CREATION, SET_VEHICLE } from '../actions/dashboard';

const initialState = {
  isOpenCreationModal: true,
  vehicle: null,

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

    case SET_VEHICLE:
      return {
        ...state,
        vehicle: action.payload.vehicle,
      };

    default:
      return state;
  }
}

export default reducer;
