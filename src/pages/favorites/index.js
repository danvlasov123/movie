import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { setFavoritesFull } from "../../store/actions";
import Api from "../../helpers/api";
import { toggleFavorites } from "../../store/actions";
import { Card, Flex, IconBlock } from "../main/styled";
import { ReactComponent as StarIcon } from "../../assets/star.svg";

export const Favorites = () => {
  const favorites = useSelector((store) => store.favorites);
  const favoritesFull = useSelector((store) => store.favoritesFull);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      if (favorites.length && favorites.length !== favoritesFull.length) {
        Promise.all(favorites.map((id) => Api.getDetails(id))).then((resp) => {
          dispatch(setFavoritesFull(resp));
        });
      }
    };

    getData();
  }, []);

  const renderMovies = () => {
    return favoritesFull.map(
      ({ title, id, overview, genre_ids, poster_path, release_date }) => (
        <Card key={`movie-${id}`}>
          <img src={Api.poster_url + poster_path} />
          <IconBlock
            onClick={() => dispatch(toggleFavorites(id))}
            active={favorites.includes(id)}
          >
            <StarIcon />
          </IconBlock>

          <Link to={`/details/${id}`}>Details</Link>
          <h3>{title}</h3>
          <p>{moment(release_date).format("DD/MM/YYYY")}</p>
          <p>{overview}</p>
        </Card>
      )
    );
  };

  return (
    <section>
      Favorites page
      <Flex>{renderMovies()}</Flex>
    </section>
  );
};
