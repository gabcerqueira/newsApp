import { Category } from "../../../types/category/Category";
import News from "../../../types/news/News";
import { NewsChunk } from "../../../types/news/NewsChunk";
import { NewsActionTypes } from "./newsActionsTypes";

export const getNewsStart = (id: string) => ({
  type: NewsActionTypes.GET_NEWS_START,
  payload: id,
});

export const getNewsSuccess = (news: News) => ({
  type: NewsActionTypes.GET_NEWS_SUCCESS,
  payload: news,
});

export const getNewsFailure = (error: string) => ({
  type: NewsActionTypes.GET_NEWS_FAILURE,
  payload: error,
});

export const getNewsWithCategoryStart = (pageNumber: number) => ({
  type: NewsActionTypes.GET_NEWS_WITH_CATEGORY_START,
  payload: pageNumber,
});

export const getNewsWithCategorySuccess = (newsChunk: NewsChunk[]) => ({
  type: NewsActionTypes.GET_NEWS_WITH_CATEGORY_SUCCESS,
  payload: newsChunk,
});

export const getNewsWithCategoryFailure = (error: string) => ({
  type: NewsActionTypes.GET_NEWS_WITH_CATEGORY_FAILURE,
  payload: error,
});

export const getNewsByCategoryStart = (
  category: string,
  currentPage: number
) => ({
  type: NewsActionTypes.GET_NEWS_BY_CATEGORY_START,
  payload: { category, currentPage },
});

export const getNewsByCategorySuccess = (news: News[]) => ({
  type: NewsActionTypes.GET_NEWS_BY_CATEGORY_SUCCESS,
  payload: news,
});

export const getNewsByCategoryFailure = (error: string) => ({
  type: NewsActionTypes.GET_NEWS_BY_CATEGORY_FAILURE,
  payload: error,
});

export const getCategoriesStart = () => ({
  type: NewsActionTypes.GET_CATEGORIES_START,
});

export const getCategoriesSuccess = (categories: Category[]) => ({
  type: NewsActionTypes.GET_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getCategoriesFailure = (error: string) => ({
  type: NewsActionTypes.GET_CATEGORIES_FAILURE,
  payload: error,
});

export const getNewsPaginatedStart = (pageNumber: number) => ({
  type: NewsActionTypes.GET_NEWS_PAGINATED_START,
  payload: pageNumber,
});

export const getNewsPaginatedSuccess = (news: News[]) => ({
  type: NewsActionTypes.GET_NEWS_PAGINATED_SUCCESS,
  payload: news,
});

export const getNewsPaginatedFailure = (error: string) => ({
  type: NewsActionTypes.GET_NEWS_PAGINATED_FAILURE,
  payload: error,
});

export const clearNewsState = () => ({
  type: NewsActionTypes.CLEAR_STATE,
});

export const clearNewsListState = () => ({
  type: NewsActionTypes.CLEAR_NEWS_LIST_STATE,
});

export const clearNewsListCategoriesState = () => ({
  type: NewsActionTypes.CLEAR_NEWS_LIST_CATEGORIES_STATE,
});
