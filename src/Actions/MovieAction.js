import { API } from "../constant";
import axios from "axios";
export const MOVIE_ADD_LIST_START = "MOVIE_ADD_LIST_START";
export const MOVIE_ADD_LIST_SUCCESS = "MOVIE_ADD_LIST_SUCCESS";
export const MOVIE_ADD_LIST_FAILED = "MOVIE_ADD_LIST_FAILED";
export const MOVIE_ADD_FAVORITE_LIST_START = "MOVIE_ADD_FAVORITE_LIST_START";
export const MOVIE_ADD_FAVORITE_LIST_SUCCESS =
  "MOVIE_ADD_FAVORITE_LIST_SUCCESS";
export const MOVIE_ADD_FAVORITE_LIST_FAILED = "MOVIE_ADD_FAVORITE_LIST_FAILED";
export const MOVIE_ADD_RATED_LIST_START = "MOVIE_ADD_RATED_LIST_START";
export const MOVIE_ADD_RATED_LIST_SUCCESS = "MOVIE_ADD_RATED_LIST_SUCCESS";
export const MOVIE_ADD_RATED_LIST_FAILED = "MOVIE_ADD_RATED_LIST_FAILED";
export const MOVIE_SET_ACTIVE_TAB = "MOVIE_SET_ACTIVE_TAB";
export const MOVIE_SET_CURRENT_CATEGORY = "MOVIE_SET_CURRENT_CATEGORY";
export const MOVIE_NEXT_PAGE = "MOVIE_NEXT_PAGE";
export const MOVIE_CURRENT_PAGE = "MOVIE_CURRENT_PAGE";
export const MOVIE_PREV_PAGE = "MOVIE_PREV_PAGE";
export const MOVIE_SET_TOTAL = "MOVIE_SET_TOTAL";
export const MOVIE_USER_LOGIN_START = "MOVIE_USER_LOGIN_START";
export const MOVIE_USER_LOGIN_SUCCESS = "MOVIE_USER_LOGIN_SUCCESS";
export const MOVIE_USER_LOGIN_FAILED = "MOVIE_AUSER_LOGIN_FAILED";
export const MOVIE_ADD_FAVORITE_START = "MOVIE_ADD_FAVORITE";
export const MOVIE_ADD_FAVORITE_SUCCESS = "MOVIE_ADD_FAVORITE_START_SUCCESS";
export const MOVIE_ADD_FAVORITE_FAILED = "MOVIE_ADD_FAVORITE_FAILED";
export const MOVIE_SET_RATE_START = "MOVIE_SET_RATE_START";
export const MOVIE_SET_RATE_SUCCESS = "MOVIE_SET_RATE_SUCCESS";
export const MOVIE_SET_RATE_FAILED = "MOVIE_SET_RATE_FAILED ";
export const MOVIE_USER_SIGNOUT = "MOVIE_USER_SIGNOUT";
export const movieSetActiveTabAction = (tab) => {
  return {
    type: MOVIE_SET_ACTIVE_TAB,
    payload: tab
  };
};

export const movieListStartAction = () => {
  return {
    type: MOVIE_ADD_LIST_START
  };
};
export const movieListSuccessAction = (data) => {
  return {
    type: MOVIE_ADD_LIST_SUCCESS,
    payload: data
  };
};
export const movieListFailedAction = (error) => {
  return {
    type: MOVIE_ADD_LIST_FAILED,
    payload: error
  };
};

export const movieFavoriteListStartAction = () => {
  return {
    type: MOVIE_ADD_FAVORITE_LIST_START
  };
};
export const movieFavoriteListSuccessAction = (data) => {
  return {
    type: MOVIE_ADD_FAVORITE_LIST_SUCCESS,
    payload: data
  };
};
export const movieFavoriteListFailedAction = (error) => {
  return {
    type: MOVIE_ADD_FAVORITE_FAILED,
    payload: error
  };
};

export const movieRatedListStartAction = () => {
  return {
    type: MOVIE_ADD_RATED_LIST_START
  };
};
export const movieRatedListSuccessAction = (data) => {
  return {
    type: MOVIE_ADD_RATED_LIST_SUCCESS,
    payload: data
  };
};
export const movieRatedListFailedAction = (error) => {
  return {
    type: MOVIE_ADD_RATED_LIST_FAILED,
    payload: error
  };
};

export const movieUserLoginFailedAction = (error) => {
  return {
    type: MOVIE_USER_LOGIN_FAILED,
    payload: error
  };
};
export const movieUserLoginStartAction = () => {
  return {
    type: MOVIE_USER_LOGIN_START
  };
};
export const movieUserLoginSuccessAction = (data) => {
  return {
    type: MOVIE_USER_LOGIN_SUCCESS,
    payload: data
  };
};

export const movieAddFavoriteStartAction = () => {
  return {
    type: MOVIE_ADD_FAVORITE_START
  };
};
export const movieAddFavoriteSuccessAction = () => {
  return {
    type: MOVIE_ADD_FAVORITE_SUCCESS
  };
};

export const movieAddFavoriteFailedAction = (error) => {
  return {
    type: MOVIE_ADD_FAVORITE_FAILED,
    payload: error
  };
};

export const movieSetRateStartAction = () => {
  return {
    type: MOVIE_SET_RATE_START
  };
};
export const movieSetRateSuccessAction = () => {
  return {
    type: MOVIE_SET_RATE_SUCCESS
  };
};

export const movieSetRateFailedAction = (error) => {
  return {
    type: MOVIE_SET_RATE_FAILED,
    payload: error
  };
};

export const movieSetTotalPageAction = (total) => {
  return {
    type: MOVIE_SET_TOTAL,
    payload: total
  };
};
export const movieSetCurrentCategoryAction = (category) => {
  console.log(category);
  return {
    type: MOVIE_SET_CURRENT_CATEGORY,
    payload: category
  };
};
export const movieGotoNextPageAction = () => {
  return { type: MOVIE_NEXT_PAGE };
};
export const movieSetCurrentPageAction = (page) => {
  return { type: MOVIE_CURRENT_PAGE, payload: page };
};
export const movieGotoPrevPageAction = () => {
  return { type: MOVIE_PREV_PAGE };
};
export const movieListADDAction = (category, page) => {
  return (dispatch) => {
    dispatch(movieListStartAction());

    fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${API}&language=en-US&page=${page}`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        //console.log(data);
        dispatch(movieListSuccessAction(data));
        dispatch(movieSetTotalPageAction(data.total_pages));
      })
      .catch((error) => {
        dispatch(movieListFailedAction(error));
      });
  };
};

export const movieUserLoginAction = (userName, passWord) => {
  return (dispatch) => {
    dispatch(movieUserLoginStartAction());
    let mySessionID = "";
    axios
      .get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${API}`
      )
      .then(
        (response) => {
          //console.log("step 1 result", response);
          axios
            .post(
              `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API}`,
              {
                username: `${userName}`,
                password: `${passWord}`,
                request_token: `${response.data.request_token}`
              }
            )
            .then(
              (response) => {
                // console.log("step 2 result", response);
                axios
                  .post(
                    `https://api.themoviedb.org/3/authentication/session/new?api_key=${API}`,
                    {
                      request_token: `${response.data.request_token}`
                    }
                  )
                  .then(
                    (response) => {
                      // console.log("step 3 result", response);
                      mySessionID = response.data.session_id;
                      axios
                        .get(
                          `
                      https://api.themoviedb.org/3/account?api_key=${API}&session_id=${response.data.session_id}`
                        )
                        .then(
                          (response) => {
                            //console.log("step 4 result is", response);
                            dispatch(
                              movieUserLoginSuccessAction({
                                sessionID: `${mySessionID}`,
                                accountID: `${response.data.id}`,
                                userName: `${response.data.username}`
                              })
                            );
                          },
                          (error) => {
                            dispatch(movieUserLoginFailedAction());
                          }
                        );
                    },
                    (error) => {
                      dispatch(movieUserLoginFailedAction());
                    }
                  );
              },
              (error) => {
                dispatch(movieUserLoginFailedAction());
              }
            );
        },
        (error) => {
          dispatch(movieUserLoginFailedAction());
        }
      );
  };
};

export const movieSetRateAction = (movieID, sessionID, rateValue) => {
  return (dispatch) => {
    dispatch(movieSetRateStartAction());
    axios
      .post(
        `https://api.themoviedb.org/3/movie/${movieID}/rating?api_key=${API}&session_id=${sessionID}`,
        { value: `${rateValue}` }
      )
      .then(
        (response) => {
          // console.log("set rate", response);
          dispatch(movieSetRateSuccessAction());
          dispatch(movieRatedListAddAction(sessionID));
        },
        (error) => {
          dispatch(movieSetRateFailedAction(error));
        }
      );
  };
};
export const movieMarkFavoriteAction = (movieID, isliked, sessionID) => {
  return (dispatch) => {
    dispatch(movieSetRateStartAction());
    axios
      .post(
        `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${API}&session_id=${sessionID}`,
        { media_type: "movie", media_id: movieID, favorite: isliked }
      )
      .then(
        (response) => {
          dispatch(movieAddFavoriteSuccessAction());
          dispatch(movieFavoriteListAddAction(sessionID));
        },
        (error) => {
          console.log(error);
          dispatch(movieSetRateFailedAction(error));
        }
      );
  };
};

export const movieFavoriteListAddAction = (sessionID) => {
  return (dispatch) => {
    dispatch(movieFavoriteListStartAction());
    axios
      .get(
        `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${API}&session_id=${sessionID}`
      )
      .then(
        (response) => {
          dispatch(movieFavoriteListSuccessAction(response));
        },
        (error) => {
          dispatch(movieAddFavoriteFailedAction(error));
        }
      );
  };
};

export const movieRatedListAddAction = (sessionID) => {
  return (dispatch) => {
    dispatch(movieRatedListStartAction());
    axios
      .get(
        `https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=${API}&session_id=${sessionID}`
      )
      .then(
        (response) => {
          dispatch(movieRatedListSuccessAction(response));
        },
        (error) => {
          dispatch(movieRatedListFailedAction(error));
        }
      );
  };
};
export const movieUserSignoutAction = () => {
  return {
    type: MOVIE_USER_SIGNOUT
  };
};
