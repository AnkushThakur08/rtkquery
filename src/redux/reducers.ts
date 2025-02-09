import { combineReducers } from "redux";
import { store } from "./store";
import counter from "./slices/counter";

const rootReducer = combineReducers({ counter });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
