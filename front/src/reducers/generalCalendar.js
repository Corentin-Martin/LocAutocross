import { SET_MODAL_CALENDAR_OPEN, SET_SELECTED_EVENT } from '../actions/generalCalendar';

const initialState = {
  modalCalendarIsOpen: false,
  selectedEvent: {
    championship: null,
    description: null,
    title: '',
    track: {
      name: '',
      city: '',
      department: '',
    },
    start: '2023-01-01',
    end: '2023-01-01',
    rentals: [],
    id: 1,
  },
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

    case SET_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: action.payload.selectedEvent,
      };

    default:
      return state;
  }
}

export default reducer;
