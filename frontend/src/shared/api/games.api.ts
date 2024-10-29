import { apiSlice } from './api.slice';

export type Game = {
  hostId: number;
  maxPlayers: number;
  players: number[];
  started: boolean;
  password: boolean;
  name?: string;
};

export const apiSliceWithGames = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    listGames: build.query<
      Game[],
      {
        noPassword: boolean;
        started: boolean;
        unavailable: boolean;
      }
    >({
      query: (body) => {
        return (
          'games/list?' +
          new URLSearchParams(
            Object.entries(body).map(([k, v]) => [k, String(v)]),
          ).toString()
        );
      },
      providesTags: ['GameList'],
    }),
  }),
});

export const { useListGamesQuery } = apiSliceWithGames;
