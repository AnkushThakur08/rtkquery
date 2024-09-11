import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
/* TODO: read about this */
import { NPS_API_REDUCER_KEY as NPS_REDUCER_PATH } from "../contracts/reduxResourceTags";

import { npsApi } from "./services"; /* API PARTS */

import authSliceReducer from "./slices/auth"; /* API PART */

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    [NPS_REDUCER_PATH]: npsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([npsApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
