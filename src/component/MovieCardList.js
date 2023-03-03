import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";
const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;

export default function MovieCardList(props) {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const currentactive = movieState.activeTab;
  const showedList = (currentactive) => {
    if (currentactive === "HOME") {
      return movieState.movieList.length !== 0
        ? movieState.movieList.results
        : [];
    } else if (currentactive === "LIKED") {
      return movieState.likedList.length !== 0
        ? movieState.likedList.data.results
        : [];
    } else if (currentactive === "RATED") {
      return movieState.ratedList.length !== 0
        ? movieState.ratedList.data.results
        : [];
    }
  };
  return (
    <ListContainer>
      {movieState.userName || currentactive === "HOME"
        ? showedList(currentactive).length === 0
          ? `${currentactive} List is empty`
          : showedList(currentactive).map((movie) => {
              const isLiked = props.likedMoviesMap
                ? props.likedMoviesMap[movie.id]
                : false;
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  liked={isLiked}
                  onToggleLike={props.onToggleLike}
                />
              );
            })
        : "please login first"}
    </ListContainer>
  );
}
