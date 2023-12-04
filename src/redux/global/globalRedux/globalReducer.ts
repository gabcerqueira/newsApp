import { AnyAction } from "redux";
import { globalActionTypes } from "../globalActions/globalActionTypes";

type globalTypes = {
  message: string | null;
  variantMessage: string | null;
};

const globalInitialState: globalTypes = {
  message: null,
  variantMessage: null,
};

const globalReducer = (state = globalInitialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case globalActionTypes.PUT_MESSAGE:
      return {
        ...state,
        message: payload.message,
        variantMessage: payload.variant,
      };
    case globalActionTypes.RESET_GLOBAL_REDUCER:
      return globalInitialState;
    default:
      return state;
  }
};

export default globalReducer;
