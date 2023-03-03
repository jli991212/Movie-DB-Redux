import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  movieGotoNextPageAction,
  movieGotoPrevPageAction
} from "../Actions/MovieAction";
const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  margin: 1rem auto;
`;

export default function Pagination() {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  return (
    <PaginationContainer>
      <Button
        onClick={() => {
          dispatch(movieGotoPrevPageAction());
        }}
      >
        Prev
      </Button>
      <p>
        {movieState.currentPage} / {movieState.totalPage}
      </p>
      <Button
        onClick={() => {
          dispatch(movieGotoNextPageAction());
        }}
      >
        Next
      </Button>
    </PaginationContainer>
  );
}
