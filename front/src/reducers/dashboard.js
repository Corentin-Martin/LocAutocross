import {
  SET_CONVERSATION,
  SET_ELEMENT_TO_DISPLAY,

  SET_ID_VEHICLE_TO_EDIT,
  SET_MY_VEHICLES, SET_NEW_BRAND, SET_NEW_TRACK, SET_OPEN_BRAND_CREATION,
  SET_OPEN_CREATION, SET_OPEN_TRACK_CREATION, SET_VEHICLE,
} from '../actions/dashboard';

const initialState = {
  isOpenCreationModal: false,
  vehicle: null,
  myVehicles: null,
  idToEdit: null,
  conversation: null,
  newBrand: null,
  openBrandCreation: false,
  newTrack: null,
  openTrackCreation: false,
  elementToDisplay: null,
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

    case SET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload.conversation,
      };

    case SET_NEW_BRAND:
      return {
        ...state,
        newBrand: action.payload.newBrand,
      };

    case SET_OPEN_BRAND_CREATION:
      return {
        ...state,
        openBrandCreation: action.payload.openBrandCreation,
      };

    case SET_NEW_TRACK:
      return {
        ...state,
        newTrack: action.payload.newTrack,
      };

    case SET_OPEN_TRACK_CREATION:
      return {
        ...state,
        openTrackCreation: action.payload.openTrackCreation,
      };

    case SET_ELEMENT_TO_DISPLAY:
      return {
        ...state,
        elementToDisplay: action.payload.elementToDisplay,
      };

    default:
      return state;
  }
}

export default reducer;
