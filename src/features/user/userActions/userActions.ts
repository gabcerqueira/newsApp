import News from "../../../types/news/News";
import { ScreenTime } from "../../../types/news/ScreenTime";
import { User } from "../../../types/user/User";
import UserActionTypes from "./userActionTypes";

export const loginStart = (email: string, password: string) => ({
  type: UserActionTypes.LOGIN_START,
  payload: {
    email,
    password,
  },
});

export const loginSuccess = (user: User) => ({
  type: UserActionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: string) => ({
  type: UserActionTypes.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: UserActionTypes.LOGOUT,
});

export const createAccountStart = (account: User) => ({
  type: UserActionTypes.CREATE_ACCOUNT_START,
  payload: account,
});

export const createAccountSuccess = (account: User) => ({
  type: UserActionTypes.CREATE_ACCOUNT_SUCCESS,
  payload: account,
});

export const createAccountFailure = (error: string) => ({
  type: UserActionTypes.CREATE_ACCOUNT_FAILURE,
  payload: error,
});

export const selectCategoriesStart = (
  userProfileId: string,
  categories: string[]
) => ({
  type: UserActionTypes.SELECT_CATEGORIES_START,
  payload: {
    userProfile: userProfileId,
    categories,
  },
});

export const selectCategoriesSuccess = (user: User) => ({
  type: UserActionTypes.SELECT_CATEGORIES_SUCCESS,
  payload: user,
});

export const selectCategoriesFailure = (error: string) => ({
  type: UserActionTypes.SELECT_CATEGORIES_FAILURE,
  payload: error,
});

export const favoriteNews = (news: News) => ({
  type: UserActionTypes.FAVORITE_NEWS,
  payload: news,
});

export const unFavoriteNews = (news: News) => ({
  type: UserActionTypes.UNFAVORITE_NEWS,
  payload: news,
});

export const addReadingTimeStart = (screenTime: ScreenTime) => ({
  type: UserActionTypes.ADD_READING_TIME_START,
  payload: screenTime,
});

export const addReadingTimeSuccess = (user: User) => ({
  type: UserActionTypes.ADD_READING_TIME_SUCCESS,
  payload: user,
});

export const addReadingTimeFailure = (error: string) => ({
  type: UserActionTypes.ADD_READING_TIME_FAILURE,
  payload: error,
});
