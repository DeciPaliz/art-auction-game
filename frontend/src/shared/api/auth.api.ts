import { apiSlice } from './api.slice';

export type AccessTokenResult = { access_token: string };

export const apiSliceWithAuth = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<
      AccessTokenResult,
      { email: string; name: string; password: string }
    >({ query: (body) => ({ url: 'auth/sign-up', method: 'POST', body }) }),

    signIn: build.mutation<
      AccessTokenResult,
      { email: string; password: string }
    >({ query: (body) => ({ url: 'auth/sign-in', method: 'POST', body }) }),

    refresh: build.mutation<AccessTokenResult, void>({
      query: () => ({ url: 'auth/refresh', method: 'POST' }),
    }),

    clear: build.mutation<void, void>({
      query: () => ({ url: 'auth/clear', method: 'POST' }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useRefreshMutation,
  useClearMutation,
} = apiSliceWithAuth;
