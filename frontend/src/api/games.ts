export type GamesListOptions = {
  noPassword?: boolean;
  unavailable?: boolean;
  started?: boolean;
};

export type GamesListResult = {
  hostId: number;
  maxPlayers: number;
  players: number[];
  started: boolean;
  password: boolean;
  name: string;
}[];

export async function gamesList(
  options?: GamesListOptions,
): Promise<GamesListResult> {
  options = options ?? {};

  const res = await fetch(
    '/api/games/list?' +
      Object.entries(options)
        .filter((entry) => entry[1])
        .map(([key]) => key)
        .join('&'),
  );
  return await res.json();
}
