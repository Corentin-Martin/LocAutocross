export const SET_OPEN_CREATION = 'SET_OPEN_CREATION';
export const setOpenCreation = (bool) => ({
  type: SET_OPEN_CREATION,
  payload: {
    isOpenCreationModal: bool,
  },
});

export const SET_MY_VEHICLES = 'SET_MY_VEHICLES';
export const setMyVehicles = (myVehicles) => ({
  type: SET_MY_VEHICLES,
  payload: {
    myVehicles: myVehicles,
  },
});

export const SET_ELEMENT_TO_DISPLAY = 'SET_ELEMENT_TO_DISPLAY';
export const setElementToDisplay = (elementToDisplay) => ({
  type: SET_ELEMENT_TO_DISPLAY,
  payload: {
    elementToDisplay: elementToDisplay,
  },
});

export const SET_ELEMENT_TO_EDIT = 'SET_ELEMENT_TO_EDIT';
export const setElementToEdit = (elementToEdit) => ({
  type: SET_ELEMENT_TO_EDIT,
  payload: {
    elementToEdit: elementToEdit,
  },
});

export const SET_CONVERSATION = 'SET_CONVERSATION';
export const setConversation = (conversation) => ({
  type: SET_CONVERSATION,
  payload: {
    conversation: conversation,
  },
});

export const SET_NEW_ITEM_BY_MODAL = 'SET_NEW_ITEM_BY_MODAL';
export const setNewItemByModal = (newItemByModal) => ({
  type: SET_NEW_ITEM_BY_MODAL,
  payload: {
    newItemByModal: newItemByModal,
  },
});
