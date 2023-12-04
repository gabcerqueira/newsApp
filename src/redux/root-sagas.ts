import { all, call, spawn } from "redux-saga/effects";

import { userSagas } from "../features/user/userRedux/userSagas";
import { newsSagas } from "../features/news/newsRedux/newsSagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(newsSagas)]);
}
