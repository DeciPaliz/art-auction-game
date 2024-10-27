import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { clearAccessToken, setAccessToken } from '@shared/store/auth.slice';
import { RootState } from '@shared/store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders(headers, { getState }) {
    const state = getState() as RootState;
    if (state.auth.accessToken)
      headers.set('Authorization', state.auth.accessToken);
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    if (refreshResult.data) {
      api.dispatch(
        setAccessToken(
          (refreshResult.data as { access_token: string }).access_token,
        ),
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearAccessToken());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['GameList'],
});

export default apiSlice.reducer;
