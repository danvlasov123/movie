export default class Api {
  static api_key = process.env.REACT_APP_API_KEY;

  static url = "https://api.themoviedb.org/3";

  static poster_url = "http://image.tmdb.org/t/p/w342";

  static getNowPlayng = (page = 1) => {
    return new Promise(async (res, rej) => {
      const result = await fetch(
        `${Api.url}/movie/now_playing?api_key=${Api.api_key}&page=${page}`
      );
      if (result.status === 200) {
        res(await result.json());
      } else {
        rej(await result.json());
      }
    });
  };

  static getDetails = (id) => {
    return new Promise(async (res, rej) => {
      const result = await fetch(
        `${Api.url}/movie/${id}?api_key=${Api.api_key}&language=en-US`
      );

      if (result.status === 200) {
        res(await result.json());
      } else {
        rej(await result.json());
      }
    });
  };

  static getGenresList = () => {
    return new Promise(async (res, rej) => {
      const result = await fetch(
        `${Api.url}/genre/movie/list?api_key=${Api.api_key}&language=en-US`
      );

      if (result.status === 200) {
        res(await result.json());
      } else {
        rej(await result.json());
      }
    });
  };
}
