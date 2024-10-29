import { apiSlice } from './api.slice';

export type AccessTokenResult = { access_token: string };

export const apiSliceWithAuth = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<
      AccessTokenResult,
      { email: string; password: string }
    >({ query: (body) => ({ url: 'auth/sign-up', body }) }),

    signIn: build.mutation<
      AccessTokenResult,
      { email: string; password: string }
    >({ query: (body) => ({ url: 'auth/sign-in', body }) }),

    clear: build.mutation<void, void>({ query: () => 'auth/clear' }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useClearMutation } =
  apiSliceWithAuth;
