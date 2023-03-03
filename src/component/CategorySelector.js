import React from "react";
import { CATEGORIES } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { movieSetCurrentCategoryAction } from "../Actions/MovieAction";
export default function CategorySelector() {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  const options = Object.values(CATEGORIES);
  return (
    <select
      value={movieState.category}
      onChange={(e) => dispatch(movieSetCurrentCategoryAction(e.target.value))}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        );
      })}
    </select>
  );
}
