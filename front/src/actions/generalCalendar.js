export const SET_FEDERATIONS = 'SET_FEDERATIONS';
export const setFederations = (federations) => ({
  type: SET_FEDERATIONS,
  payload: {
    federations: federations,
  },
});

export const SET_SEARCH = 'SET_SEARCH';
export const setSearch = (search) => ({
  type: SET_SEARCH,
  payload: {
    search: search,
  },
});
