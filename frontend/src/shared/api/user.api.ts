import { apiSlice } from './api.slice';

export type User = {
  name: string | null;
  id: number;
  email: string;
};

export const apiSliceWithUser = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => 'users/me',
      providesTags: ['Me'],
    }),
    editMe: build.mutation<User, { name?: string }>({
      query: (body) => ({ url: 'users/me', method: 'PATCH', body }),
      invalidatesTags: ['Me'],
    }),
  }),
});

export const { useGetMeQuery, useEditMeMutation } = apiSliceWithUser;
