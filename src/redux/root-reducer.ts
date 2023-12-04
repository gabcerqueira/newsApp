import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "./store";

import userReducer from "../features/user/userRedux/userReducer";
import newsReducer from "../features/news/newsRedux/newsReducer";
import globalReducer from "./global/globalRedux/globalReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  news: newsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistedReducer = persistReducer<RootState>(
  persistConfig,
  rootReducer
);
