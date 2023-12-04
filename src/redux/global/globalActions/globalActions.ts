import { globalActionTypes } from "./globalActionTypes";

export const putMessage = (message: string, variant: string) => ({
  type: globalActionTypes.PUT_MESSAGE,
  payload: { message, variant },
});

export const resetGlobalReducer = () => ({
  type: globalActionTypes.RESET_GLOBAL_REDUCER,
});
