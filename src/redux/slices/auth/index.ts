import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { npsApi } from "../../services";

// Add API REQUEST & REPONSE

export const AUTH_KEY = "auth";

const persistedAuth = sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);

interface AuthSlice {
  //   authenticated?: IUserRegisterResponse;
  authenticated?: any;
}

let initialState: AuthSlice = {
  authenticated: persistedAuth ? JSON.parse(persistedAuth) : {},
};

export const authSlice = createSlice({
  name: AUTH_KEY,
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_KEY);

      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(npsApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
        // "token" in payload?.data

        if (isUserLoginResponse(payload)) {
          state.authenticated = payload;
          localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
        } else {
          state = null;
          localStorage.removeItem(AUTH_KEY);
        }
      })
      .addMatcher(npsApi.endpoints.loginUser.matchRejected, (state, { payload }) => {
        if (isApiErrorResponse(payload.data)) {
        } else {
          console.error(`something went wrong`);
        }
        console.error(payload.data, "error");
      })
      .addMatcher(npsApi.endpoints.registerUser.matchFulfilled, (state, { payload }) => {
        if (isUserLoginResponse(payload)) {
          state.authenticated = payload;
          localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
        } else {
          state = null;
          localStorage.removeItem(AUTH_KEY);
          console.error("something went wrong");
        }
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.authenticated;

export const selectIsLoggedIn = (state: RootState) => !!state.auth.authenticated?.token;
