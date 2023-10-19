import { SET_TRACKS } from '../actions/map';

const initialState = {
  tracks: null,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TRACKS:
      return {
        ...state,
        tracks: action.payload.tracks,
      };

    default:
      return state;
  }
}

export default reducer;
