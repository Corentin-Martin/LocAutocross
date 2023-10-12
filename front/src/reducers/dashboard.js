import {
  SET_CONVERSATION,
  SET_ELEMENT_TO_DISPLAY,
  SET_ELEMENT_TO_EDIT,
  SET_MY_VEHICLES, SET_NEW_ITEM_BY_MODAL,
  SET_OPEN_CREATION,
} from '../actions/dashboard';

const initialState = {
  isOpenCreationModal: false,
  myVehicles: null,
  conversation: null,
  elementToDisplay: null,
  elementToEdit: null,
  newItemByModal: null,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_OPEN_CREATION:
      return {
        ...state,
        isOpenCreationModal: action.payload.isOpenCreationModal,
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

    case SET_ELEMENT_TO_DISPLAY:
      return {
        ...state,
        elementToDisplay: action.payload.elementToDisplay,
      };

    case SET_ELEMENT_TO_EDIT:
      return {
        ...state,
        elementToEdit: action.payload.elementToEdit,
      };

    case SET_NEW_ITEM_BY_MODAL:
      return {
        ...state,
        newItemByModal: action.payload.newItemByModal,
      };

    default:
      return state;
  }
}

export default reducer;
