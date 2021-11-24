import { Fragment, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "./components/header";
import { Wrapper } from "./components/common";
//pages
import { Favorites } from "./pages/favorites";
import { MainPage } from "./pages/main";
import { MovieDetails } from "./pages/movieDetails";

import { setReady, setTotalPages, setPage, setGenres } from "./store/actions";

import Api from "./helpers/api";

function App() {
  const app_ready = useSelector((state) => state.appReady);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const getInitial = async () => {
      const genres = await Api.getGenresList().catch(console.log);
      const firstPage = await Api.getNowPlayng(1).catch(console.log);
      if (genres && firstPage) {
        const { total_pages, results } = firstPage;
        dispatch(setGenres(genres));
        dispatch(setTotalPages(total_pages));
        dispatch(setPage(1, results));
        dispatch(setReady(true));
      }
    };

    if (!localStorage.getItem("favorites")) {
      localStorage.setItem("favorites", JSON.stringify([]));
    }

    getInitial();
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Fragment>
      <Header />
      {app_ready ? (
        <Wrapper>
          <Switch>
            <Route path="/favorites" component={Favorites} />
            <Route exact path="/main/:page" component={MainPage} />
            <Route
              exact
              path="/details/:id/:pageFrom?"
              component={MovieDetails}
            />
            <Route exact path="/" component={() => <Redirect to="/main/1" />} />
            {/* not found page  */}
            <Route component={() => <div>Not found</div>} />
          </Switch>
        </Wrapper>
      ) : (
        <div>Loader...</div>
      )}
    </Fragment>
  );
}

export default App;
