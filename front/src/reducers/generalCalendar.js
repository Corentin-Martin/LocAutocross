import { SET_FEDERATIONS, SET_SEARCH } from '../actions/generalCalendar';

const initialState = {

  federations: null,
  search: null,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_FEDERATIONS:
      return {
        ...state,
        federations: action.payload.federations,
      };

    case SET_SEARCH:
      return {
        ...state,
        search: action.payload.search,
      };

    default:
      return state;
  }
}

export default reducer;
