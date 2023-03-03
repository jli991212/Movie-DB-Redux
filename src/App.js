import "./styles.css";
import React, { useState, useEffect, useMemo } from "react";
import Header from "./component/Header";
import Pagination from "./component/Pagination";
import MovieDetails from "./component/MovieDetails";
import MovieCardList from "./component/MovieCardList";
import { TABS } from "./constant";
import CategorySelector from "./component/CategorySelector";
import { useDispatch, useSelector } from "react-redux";
import {
  movieListADDAction,
  movieMarkFavoriteAction,
  movieFavoriteListAddAction,
  movieRatedListAddAction,
  movieSetCurrentPageAction,
  movieSetActiveTabAction
} from "./Actions/MovieAction";
import LoginPage from "./component/LoginPage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieListADDAction(movieState.category, movieState.currentPage));
  }, [movieState.category, movieState.currentPage]);
  useEffect(() => {
    dispatch(movieSetCurrentPageAction(1));
  }, [movieState.category]);
  useEffect(() => {
    if (movieState.sessionID) {
      dispatch(movieFavoriteListAddAction(movieState.sessionID));
      dispatch(movieRatedListAddAction(movieState.sessionID));
    }
  }, [movieState.sessionID, movieState.activeTab]);
  const isHomeTab = movieState.activeTab === TABS.HOME;
  const likedMoviesMap = useMemo(() => {
    console.log(movieState.likedList);
    if (movieState.sessionID && movieState.likedList.length !== 0) {
      return movieState.likedList.data.results.reduce((acc, likedMovie) => {
        acc[likedMovie.id] = likedMovie;
        return acc;
      }, {});
    }
  }, [movieState.likedList, movieState.sessionID]);

  const handleToggleLike = (movie) => {
    if (movieState.sessionID) {
      console.log("check movie liked", likedMoviesMap[movie.id]);
      const hasLiked = likedMoviesMap[movie.id];
      if (hasLiked) {
        console.log("set false");
        dispatch(
          movieMarkFavoriteAction(movie.id, false, movieState.sessionID)
        );
      } else {
        console.log("set true");
        dispatch(movieMarkFavoriteAction(movie.id, true, movieState.sessionID));
      }
    }
  };
  const RenderBody = () => {
    return (
      <div>
        {isHomeTab && <CategorySelector />}
        {isHomeTab && <Pagination />}
        <MovieCardList
          likedMoviesMap={likedMoviesMap}
          onToggleLike={handleToggleLike}
        />
      </div>
    );
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<RenderBody />} />
        <Route
          path="/Favorite"
          element={
            <div>
              {" "}
              <h2>Favorite Movie list</h2>
              <MovieCardList
                likedMoviesMap={likedMoviesMap}
                onToggleLike={handleToggleLike}
              />
            </div>
          }
        />
        <Route
          path="/Rated"
          element={
            <div>
              {" "}
              <h2>Rated Movie list</h2>
              <MovieCardList
                likedMoviesMap={likedMoviesMap}
                onToggleLike={handleToggleLike}
              />
            </div>
          }
        />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/movieDetail/:movieId" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}
