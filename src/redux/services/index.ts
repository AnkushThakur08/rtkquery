import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NPS_API_REDUCER_KEY } from "../../contracts/reduxResourceTags";

// Add API request and Response

// Add Tags

import { RootState } from "../store";

export const npsApi = createApi({
  reducerPath: NPS_API_REDUCER_KEY,
  tagTypes: [
    // Add Tags
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_KEY}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.authenticated.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    /* TODO: Add endpoints here */
  }),
});

export const {} = npsApi;
