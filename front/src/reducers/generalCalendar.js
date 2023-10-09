import { SET_FEDERATIONS } from '../actions/generalCalendar';

const initialState = {

  federations: null,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_FEDERATIONS:
      return {
        ...state,
        federations: action.payload.federations,
      };

    default:
      return state;
  }
}

export default reducer;
