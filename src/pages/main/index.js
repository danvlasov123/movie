import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import Api from "../../helpers/api";
import { setPage, toggleFavorites } from "../../store/actions";
import { Card, Flex, IconBlock } from "./styled";
import { ReactComponent as StarIcon } from "../../assets/star.svg";

export const MainPage = ({
  match: {
    params: { page },
  },
}) => {
  const movies = useSelector((store) => store.movies);
  const totalPages = useSelector((store) => store.totalPages);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movies[page]) {
      Api.getNowPlayng(page).then((data) => {
        dispatch(setPage(page, data.results));
      });
    }
  }, [page]);

  const renderMovies = () => {
    if (movies[page]) {
      return movies[page].map(
        ({ title, id, overview, genre_ids, poster_path, release_date }) => (
          <Card key={`movie-${id}`}>
            <img src={Api.poster_url + poster_path} />
            <IconBlock
              onClick={() => dispatch(toggleFavorites(id))}
              active={favorites.includes(id)}
            >
              <StarIcon />
            </IconBlock>

            <Link to={`/details/${id}/${page}`}>Details</Link>
            <h3>{title}</h3>
            <p>{moment(release_date).format("DD/MM/YYYY")}</p>
            <p>{overview}</p>
          </Card>
        )
      );
    }
  };

  return (
    <section>
      Main page
      <div style={{ marginBottom: 20 }}>
        {page !== "1" ? <Link to={`/main/${+page - 1}`}>Prev</Link> : null}
        <span>
          {page}/{totalPages}
        </span>
        {+page < totalPages ? (
          <Link to={`/main/${+page + 1}`}>Next</Link>
        ) : null}
      </div>
      <Flex>{movies[page] ? renderMovies() : <div>Loader...</div>}</Flex>
    </section>
  );
};
