export const setGenres = (data) => {
  return { type: "SET_GENRES", payload: data };
};

export const setPage = (page, results) => {
  return { type: "SET_PAGE_RESULTS", payload: { page, results } };
};

export const setTotalPages = (count) => {
  return { type: "SET_TOTAL_PAGES", payload: count };
};

export const setMovieDetails = (id, details) => {
  return { type: "SET_MOVIE_DETAILS", payload: { id, details } };
};

export const setReady = (val) => {
  return { type: "SET_APP_READY", payload: val };
};

export const toggleFavorites = (id) => {
  return { type: "SET_FAVORITES_STATUS", payload: id };
};

export const setFavoritesFull = (arr) => {
  return { type: "SET_FAVORITES_FULL", payload: arr };
};
