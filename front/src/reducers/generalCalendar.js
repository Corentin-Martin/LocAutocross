import { SET_MODAL_CALENDAR_OPEN } from '../actions/generalCalendar';

const initialState = {
  modalCalendarIsOpen: false,
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

    case SET_MODAL_CALENDAR_OPEN:
      return {
        ...state,
        modalCalendarIsOpen: action.payload.modalCalendarIsOpen,
      };

    default:
      return state;
  }
}

export default reducer;
