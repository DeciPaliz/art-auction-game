import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Game } from '../api/games.api';
import { SerializedError } from '@reduxjs/toolkit';

export const GameList = (props: {
  games?: Game[];
  error?: FetchBaseQueryError | SerializedError;
}) => {
  if (props.error) return <>{props.error}</>;
  if (!props.games) return <></>;

  return (
    <>
      <ul>
        {props.games?.map((game) => (
          <li key={game.hostId}>{game.name}'s Game</li>
        ))}
      </ul>
    </>
  );
};
