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

export const SET_MODAL_CALENDAR_OPEN = 'SET_MODAL_CALENDAR_OPEN';
export const setModalCalendarIsOpen = (bool) => ({
  type: SET_MODAL_CALENDAR_OPEN,
  payload: {
    modalCalendarIsOpen: bool,
  },
});

export const SET_SELECTED_EVENT = 'SET_SELECTED_EVENT';
export const setSelectedEvent = (event) => ({
  type: SET_SELECTED_EVENT,
  payload: {
    selectedEvent: event,
  },
});
