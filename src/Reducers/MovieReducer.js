import * as Actions from "../Actions/MovieAction";
import { TABS, CATEGORIES } from "../constant";

const initlState = {
  movieList: [],
  likedList: [],
  ratedList: [],
  activeTab: TABS.HOME,
  currentPage: 1,
  totalPage: 999,
  category: CATEGORIES.NOW_PLAYING.value,
  error: null,
  loading: false,
  sessionID: "",
  accountID: "",
  userName: ""
};

const reducer = (state = initlState, action) => {
  switch (action.type) {
    case Actions.MOVIE_SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.payload
      };
    }
    case Actions.MOVIE_SET_CURRENT_CATEGORY: {
      return {
        ...state,
        category: action.payload
      };
    }
    case Actions.MOVIE_SET_TOTAL: {
      return {
        ...state,
        totalPage: action.payload
      };
    }
    case Actions.MOVIE_NEXT_PAGE: {
      const curPage =
        state.currentPage === state.totalPage
          ? state.totalPage
          : state.currentPage + 1;
      return {
        ...state,
        currentPage: curPage
      };
    }
    case Actions.MOVIE_PREV_PAGE: {
      const curPage = state.currentPage === 1 ? 1 : state.currentPage - 1;
      return {
        ...state,
        currentPage: curPage
      };
    }
    case Actions.MOVIE_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload
      };
    }
    case Actions.MOVIE_ADD_LIST_START: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case Actions.MOVIE_ADD_LIST_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case Actions.MOVIE_ADD_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        movieList: action.payload
      };
    }
    case Actions.MOVIE_USER_LOGIN_START: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case Actions.MOVIE_USER_LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case Actions.MOVIE_USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        sessionID: action.payload.sessionID,
        accountID: action.payload.accountID,
        userName: action.payload.userName
      };
    }
    case Actions.MOVIE_SET_USER_SEESION: {
      return {
        ...state
      };
    }
    case Actions.MOVIE_ADD_FAVORITE_START: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case Actions.MOVIE_ADD_FAVORITE_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case Actions.MOVIE_ADD_FAVORITE_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }
    case Actions.MOVIE_SET_RATE_START: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case Actions.MOVIE_SET_RATE_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case Actions.MOVIE_SET_RATE_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }
    case Actions.MOVIE_ADD_FAVORITE_LIST_START: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case Actions.MOVIE_ADD_FAVORITE_LIST_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case Actions.MOVIE_ADD_FAVORITE_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        likedList: action.payload
      };
    }
    case Actions.MOVIE_ADD_RATED_LIST_START: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case Actions.MOVIE_ADD_RATED_LIST_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case Actions.MOVIE_ADD_RATED_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        ratedList: action.payload
      };
    }
    case Actions.MOVIE_USER_SIGNOUT: {
      return {
        ...state,
        sessionID: "",
        userName: "",
        accountID: ""
      };
    }
    default:
      return state;
  }
};

export default reducer;
