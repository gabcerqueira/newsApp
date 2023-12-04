import { all, call, put, takeLatest } from "redux-saga/effects";

import { Api } from "../../../lib/api/api";
import { serverConfig } from "../../../lib/api/config";

import { HttpResponse } from "../../../lib/api/@types/httpClient";
import { NewsActionTypes } from "../newsActions/newsActionsTypes";
import { Category } from "../../../types/category/Category";
import {
  getCategoriesFailure,
  getCategoriesSuccess,
  getNewsWithCategoryFailure,
  getNewsWithCategoryStart,
  getNewsWithCategorySuccess,
} from "../newsActions/newsActions";
import { NewsChunk } from "../../../types/news/NewsChunk";

function* getCategoriesAsync(): Generator<any> {
  try {
    const api = new Api();
    const response = (yield api.Fetch({
      url: serverConfig.pathUseCases.news.getCategories.servico,
      method: serverConfig.pathUseCases.news.getCategories.metodo,
    })) as HttpResponse<Category[]>;

    yield put(getCategoriesSuccess(response.body!));
    // yield put(putMessage("Login realizado com sucesso", "success"));
  } catch (error) {
    console.log((error as Error).message);
    yield put(getCategoriesFailure((error as Error).message));
  }
}

function* getNewsWithCategoryAsync({
  payload,
}: ReturnType<typeof getNewsWithCategoryStart>): Generator<any> {
  try {
    const api = new Api();
    const response = (yield api.Fetch({
      url:
        serverConfig.pathUseCases.news.getNewsWithCategories.servico +
        `?pageNumber=${payload}&pageSize=20`,
      method: serverConfig.pathUseCases.news.getNewsWithCategories.metodo,
    })) as HttpResponse<NewsChunk[]>;

    yield put(getNewsWithCategorySuccess(response.body!));
    // yield put(putMessage("Login realizado com sucesso", "success"));
  } catch (error) {
    console.log((error as Error).message);
    yield put(getNewsWithCategoryFailure((error as Error).message));
  }
}

export function* onGetCategoriesStart() {
  yield takeLatest(NewsActionTypes.GET_CATEGORIES_START, getCategoriesAsync);
}

export function* onGetNewsWithCategory() {
  yield takeLatest(
    NewsActionTypes.GET_NEWS_WITH_CATEGORY_START,
    getNewsWithCategoryAsync
  );
}

export function* newsSagas() {
  yield all([call(onGetCategoriesStart), call(onGetNewsWithCategory)]);
}
