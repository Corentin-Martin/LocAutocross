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
