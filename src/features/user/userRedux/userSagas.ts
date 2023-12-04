import { all, call, put, takeLatest } from "redux-saga/effects";

import { Api } from "../../../lib/api/api";
import { serverConfig } from "../../../lib/api/config";

import UserActionTypes from "../userActions/userActionTypes";
import {
  createAccountFailure,
  createAccountStart,
  createAccountSuccess,
  addReadingTimeStart,
  loginFailure,
  loginStart,
  loginSuccess,
  selectCategoriesFailure,
  selectCategoriesStart,
  selectCategoriesSuccess,
  addReadingTimeSuccess,
  addReadingTimeFailure,
} from "../userActions/userActions";
import { HttpResponse } from "../../../lib/api/@types/httpClient";
import { User } from "../../../types/user/User";
import { putMessage } from "../../../redux/global/globalActions/globalActions";
import { clearNewsState } from "../../news/newsActions/newsActions";

function* loginAsync({
  payload: { email, password },
}: ReturnType<typeof loginStart>): Generator<any> {
  try {
    const api = new Api();
    const response = (yield api.Fetch({
      url: serverConfig.pathUseCases.auth.login.servico,

      method: serverConfig.pathUseCases.auth.login.metodo,
      body: {
        email,
        password,
      },
    })) as HttpResponse<{
      user: User;
      token: { token: string; renewToken: string };
    }>;

    yield put(loginSuccess(response.body!.user));
    yield put(putMessage("Login realizado com sucesso", "success"));
    yield put(clearNewsState());
  } catch (error) {
    console.log((error as Error).message);
    yield put(loginFailure((error as Error).message));
  }
}

//
function* createAccountAsync({
  payload,
}: ReturnType<typeof createAccountStart>): Generator<any> {
  try {
    const api = new Api();
    const response = (yield api.Fetch({
      url: serverConfig.pathUseCases.user.create.servico,

      method: serverConfig.pathUseCases.user.create.metodo,
      body: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      },
    })) as HttpResponse<User>;

    yield put(createAccountSuccess(response.body!));
    yield put(putMessage("Conta criada com sucesso", "success"));
  } catch (error) {
    console.log((error as Error).message);
    yield put(createAccountFailure((error as Error).message));
  }
}

//
function* selectCategoriesAsync({
  payload,
}: ReturnType<typeof selectCategoriesStart>): Generator<any> {
  try {
    const api = new Api();
    const response = (yield api.Fetch({
      url: serverConfig.pathUseCases.user.selectCategories.servico,

      method: serverConfig.pathUseCases.user.selectCategories.metodo,
      body: {
        userProfile: payload.userProfile,
        categories: payload.categories,
      },
    })) as HttpResponse<User>;

    yield put(selectCategoriesSuccess(response.body!));
    yield put(putMessage("Categorias selecionadas !", "success"));
  } catch (error) {
    console.log((error as Error).message);
    yield put(selectCategoriesFailure((error as Error).message));
    yield put(putMessage("Falha ao selecionar categorias !", "error"));
  }
}

//getScreenTimeAsync
function* addReadingTimeAsync({
  payload,
}: ReturnType<typeof addReadingTimeStart>): Generator<any> {
  try {
    const api = new Api();
    const response = (yield api.Fetch({
      url: serverConfig.pathUseCases.user.addReadingTime.servico,

      method: serverConfig.pathUseCases.user.addReadingTime.metodo,
      body: {
        userProfile: payload.userProfile,
        news: payload.news,
        readingTime: payload.readingTime,
      },
    })) as HttpResponse<User>;

    yield put(addReadingTimeSuccess(response.body!));
    yield put(putMessage("Tempo adicionado !", "success"));
  } catch (error) {
    console.log((error as Error).message);
    yield put(addReadingTimeFailure((error as Error).message));
    yield put(putMessage("Falha ao adicionar tempo !", "error"));
  }
}

export function* onAddReadingTimeStart() {
  yield takeLatest(UserActionTypes.ADD_READING_TIME_START, addReadingTimeAsync);
}

export function* onLoginStart() {
  yield takeLatest(UserActionTypes.LOGIN_START, loginAsync);
}

export function* onCreateAccountStart() {
  yield takeLatest(UserActionTypes.CREATE_ACCOUNT_START, createAccountAsync);
}

export function* onSelectCategoriesStart() {
  yield takeLatest(
    UserActionTypes.SELECT_CATEGORIES_START,
    selectCategoriesAsync
  );
}

export function* userSagas() {
  yield all([
    call(onLoginStart),
    call(onCreateAccountStart),
    call(onSelectCategoriesStart),
    call(onAddReadingTimeStart),
  ]);
}
