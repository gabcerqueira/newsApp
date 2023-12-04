import { AnyAction } from "redux";
import News from "../../../types/news/News";
import { NewsChunk } from "../../../types/news/NewsChunk";
import { NewsActionTypes } from "../newsActions/newsActionsTypes";
import { Category } from "../../../types/category/Category";

type NewsTypes = {
  isFetching: boolean;
  error: string | null;
  news: News | null;
  newsChunk: NewsChunk[] | null;
  newsList: News[];
  newsListCategories: News[];
  categories: Category[];
};

const newsInitialState: NewsTypes = {
  isFetching: false,
  error: null,
  news: null,
  newsChunk: [],
  newsList: [],
  newsListCategories: [],
  categories: [],
};

const userReducer = (state = newsInitialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case NewsActionTypes.GET_NEWS_START:
    case NewsActionTypes.GET_NEWS_BY_CATEGORY_START:
    case NewsActionTypes.GET_NEWS_WITH_CATEGORY_START:
    case NewsActionTypes.GET_CATEGORIES_START:
    case NewsActionTypes.GET_NEWS_PAGINATED_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case NewsActionTypes.GET_NEWS_WITH_CATEGORY_START:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case NewsActionTypes.GET_NEWS_BY_CATEGORY_FAILURE:
    case NewsActionTypes.GET_NEWS_FAILURE:
    case NewsActionTypes.GET_NEWS_WITH_CATEGORY_FAILURE:
    case NewsActionTypes.GET_CATEGORIES_FAILURE:
    case NewsActionTypes.GET_NEWS_PAGINATED_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: payload,
      };

    case NewsActionTypes.GET_NEWS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        newsListCategories: [...state.newsListCategories, ...payload],
      };
    case NewsActionTypes.CLEAR_NEWS_LIST_CATEGORIES_STATE:
      return {
        ...state,
        isFetching: false,
        error: null,
        newsListCategories: [],
      };

    case NewsActionTypes.GET_NEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        news: payload,
      };
    case NewsActionTypes.GET_NEWS_WITH_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        newsChunk: [...state.newsChunk!, ...payload],
      };
    case NewsActionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        categories: payload,
      };

    case NewsActionTypes.GET_NEWS_PAGINATED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        newsList: [...state.newsList, ...payload],
      };
    case NewsActionTypes.CLEAR_STATE:
      return newsInitialState;

    case NewsActionTypes.CLEAR_NEWS_LIST_STATE:
      return {
        ...state,
        newsList: [],
      };

    default:
      return state;
  }
};

export default userReducer;
