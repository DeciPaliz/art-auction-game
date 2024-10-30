import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Game } from '../../../shared/api/game.api';
import { GameListEntry } from './GameListEntry';
import './GameList.scss';

export const GameList = (props: {
  games?: Game[];
  error?: FetchBaseQueryError | SerializedError;
  askPassword: () => Promise<string>;
}) => {
  if (props.error) {
    console.log(props.error);
    return <>Server error</>;
  }
  if (!props.games) return <></>;

  return (
    <div className="game-list">
      <ul>
        {props.games?.map((game) => (
          <li key={game.hostId}>
            <GameListEntry game={game} askPassword={props.askPassword} />
          </li>
        ))}
      </ul>
    </div>
  );
};
