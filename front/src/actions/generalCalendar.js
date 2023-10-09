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

export const SET_FEDERATIONS = 'SET_FEDERATIONS';
export const setFederations = (federations) => ({
  type: SET_FEDERATIONS,
  payload: {
    federations: federations,
  },
});
