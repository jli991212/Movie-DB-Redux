import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import MovieReducer from "./Reducers/MovieReducer";

const rootReducer = combineReducers({
  movie: MovieReducer
});

const middlewares = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, middlewares);

export default store;
