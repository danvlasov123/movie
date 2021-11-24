import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Api from "../../helpers/api";
import { setMovieDetails } from "../../store/actions";

export const MovieDetails = ({
  match: {
    params: { id, pageFrom },
  },
}) => {
  const moviesDetails = useSelector((store) => store.moviesDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!moviesDetails[id]) {
      Api.getDetails(id).then((data) => {
        dispatch(setMovieDetails(id, data));
      });
    }
  }, [id]);

  const renderGenres = (genres) => {
    let str = `Genres: `;
    genres.forEach(({ name }, i) => {
      str += `${name} ${i < genres.length - 1 ? ", " : "."}`;
    });

    return str;
  };

  if (moviesDetails[id]) {
    const { genres, homepage, title, poster_path, tagline, overview } =
      moviesDetails[id];
    return (
      <section>
        <Link to={`/main/${pageFrom || "1"}`}>Back</Link>
        <div>
          <img src={Api.poster_url + poster_path} alt="poster img" />
          <h2>{title}</h2>
          <p>{tagline}</p>
          <p>{renderGenres(genres)}</p>
          <a rel="noreferrer" href={homepage}></a>
          <p>{overview}</p>
        </div>
      </section>
    );
  } else {
    return <div>Loader...</div>;
  }
};
