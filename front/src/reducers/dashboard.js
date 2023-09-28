import {
  SET_CONVERSATION,
  SET_ID_VEHICLE_TO_EDIT,
  SET_MY_VEHICLES, SET_OPEN_CREATION, SET_RENTAL, SET_VEHICLE,
} from '../actions/dashboard';

const initialState = {
  isOpenCreationModal: false,
  vehicle: null,
  myVehicles: null,
  idToEdit: null,
  rental: null,
  conversation: null,
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

    case SET_ID_VEHICLE_TO_EDIT:
      return {
        ...state,
        idToEdit: action.payload.idToEdit,
      };

    case SET_MY_VEHICLES:
      return {
        ...state,
        myVehicles: action.payload.myVehicles,
      };

    case SET_RENTAL:
      return {
        ...state,
        rental: action.payload.rental,
      };

    case SET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload.conversation,
      };

    default:
      return state;
  }
}

export default reducer;
