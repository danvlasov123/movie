const initialState = {
  movies: {},
  totalPages: 0,
  genres: [],
  moviesDetails: {},
  appReady: false,
  favorites: localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [],
  favoritesFull: [],
};

export const reducer = (state = initialState, action) => {
  if (action.type === "SET_APP_READY") {
    return { ...state, appReady: action.payload };
  }
  if (action.type === "SET_GENRES") {
    return { ...state, genres: action.payload };
  }
  if (action.type === "SET_TOTAL_PAGES") {
    return { ...state, totalPages: action.payload };
  }
  if (action.type === "SET_PAGE_RESULTS") {
    const { page, results } = action.payload;
    return { ...state, movies: { ...state.movies, [page]: results } };
  }
  if (action.type === "SET_MOVIE_DETAILS") {
    const { id, details } = action.payload;
    return { ...state, moviesDetails: { ...state.moviesDetails, [id]: details } };
  }
  if (action.type === "SET_FAVORITES_STATUS") {
    const _favorites = [...state.favorites];
    const id = action.payload;

    const index = _favorites.indexOf(id);
    if (index === -1) {
      _favorites.push(id);
    } else {
      _favorites.splice(index, 1);
    }
    return { ...state, favorites: _favorites };
  }
  if (action.type === "SET_FAVORITES_FULL") {
    return { ...state, favoritesFull: action.payload };
  }
  return state;
};
