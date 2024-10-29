import { apiSlice } from './api.slice';

export type Game = {
  hostId: number;
  maxPlayers: number;
  players: number[];
  started: boolean;
  password: boolean;
  name?: string;
};

export type JoinGameResult = {
  id: number;
  turnOrder: number | null;
  gameId: number;
  money: number | null;
  bid: number | null;
};

export const apiSliceWithGame = apiSlice.injectEndpoints({
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

    createGame: build.mutation<
      JoinGameResult,
      { maxPlayers: number; password?: string }
    >({
      query: (body) => ({ url: 'games/create', method: 'POST', body }),
    }),

    getMyGame: build.query<Game, void>({ query: () => 'games/my' }),

    joinGame: build.mutation<
      JoinGameResult,
      { gameId: number; password?: string }
    >({ query: (body) => ({ url: 'games/join', method: 'POST', body }) }),

    leaveGame: build.mutation<void, void>({
      query: () => ({ url: 'games/leave', method: 'DELETE' }),
    }),
  }),
});

export const {
  useListGamesQuery,
  useCreateGameMutation,
  useGetMyGameQuery,
  useJoinGameMutation,
  useLeaveGameMutation,
} = apiSliceWithGame;
