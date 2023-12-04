import { AnyAction } from "redux";
import UserActionTypes from "../userActions/userActionTypes";
import { User } from "../../../types/user/User";
import News from "../../../types/news/News";

type UserTypes = {
  isFetching: boolean;
  error: string | null;
  user: User | null;
  isUserAuthenticated: boolean;
  favoriteNews: News[];
};

const userInitialState: UserTypes = {
  isFetching: false,
  error: null,
  user: null,
  isUserAuthenticated: false,
  favoriteNews: [],
};

const userReducer = (state = userInitialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.LOGIN_START:
    case UserActionTypes.CREATE_ACCOUNT_START:
    case UserActionTypes.SELECT_CATEGORIES_START:
      return {
        ...state,
        isFetching: true,
        error: null,
        //user: null,
      };

    case UserActionTypes.ADD_READING_TIME_START:
      return {
        ...state,
        error: null,
      };
    case UserActionTypes.ADD_READING_TIME_SUCCESS:
      return {
        ...state,
        error: null,
        user: payload,
      };

    case UserActionTypes.LOGIN_SUCCESS:
    case UserActionTypes.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        user: payload,
        isUserAuthenticated: true,
      };

    case UserActionTypes.SELECT_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        user: payload,
      };

    case UserActionTypes.LOGIN_FAILURE:
    case UserActionTypes.CREATE_ACCOUNT_FAILURE:
    case UserActionTypes.SELECT_CATEGORIES_FAILURE:
    case UserActionTypes.ADD_READING_TIME_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    case UserActionTypes.LOGOUT:
      return {
        ...state,
        isFetching: false,
        error: null,
        user: null,
        isUserAuthenticated: false,
      };

    case UserActionTypes.FAVORITE_NEWS:
      return {
        ...state,
        favoriteNews:
          state.favoriteNews !== undefined
            ? [...new Set([payload, ...state.favoriteNews])]
            : [payload],
      };

    case UserActionTypes.UNFAVORITE_NEWS:
      return {
        ...state,
        favoriteNews:
          state.favoriteNews !== undefined
            ? [...state.favoriteNews].filter((news) => news._id !== payload._id)
            : [],
      };

    default:
      return state;
  }
};

export default userReducer;
