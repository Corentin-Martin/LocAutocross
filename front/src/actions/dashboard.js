/*
Exemple d'action creator

export const SET_CONNECTED_USER = 'SET_CONNECTED_USER';
export const setConnectedUser = (connectedUser) => ({
  type: SET_CONNECTED_USER,
  payload: {
    connectedUser: connectedUser,
  },
});
*/

export const SET_OPEN_CREATION = 'SET_OPEN_CREATION';
export const setOpenCreation = (bool) => ({
  type: SET_OPEN_CREATION,
  payload: {
    isOpenCreationModal: bool,
  },
});

export const SET_VEHICLE = 'SET_VEHICLE';
export const setVehicleForDetails = (vehicle) => ({
  type: SET_VEHICLE,
  payload: {
    vehicle: vehicle,
  },
});

export const SET_ID_VEHICLE_TO_EDIT = 'SET_ID_VEHICLE_TO_EDIT';
export const setIdToEdit = (idVehicleToEdit) => ({
  type: SET_ID_VEHICLE_TO_EDIT,
  payload: {
    idToEdit: idVehicleToEdit,
  },
});

export const SET_MY_VEHICLES = 'SET_MY_VEHICLES';
export const setMyVehicles = (myVehicles) => ({
  type: SET_MY_VEHICLES,
  payload: {
    myVehicles: myVehicles,
  },
});

export const SET_RENTAL = 'SET_RENTAL';
export const setRental = (rental) => ({
  type: SET_RENTAL,
  payload: {
    rental: rental,
  },
});

export const SET_CONVERSATION = 'SET_CONVERSATION';
export const setConversation = (conversation) => ({
  type: SET_CONVERSATION,
  payload: {
    conversation: conversation,
  },
});
