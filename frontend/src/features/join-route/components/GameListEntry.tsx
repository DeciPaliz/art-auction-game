import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Game } from '../../../shared/api/game.api';
import './GameListEntry.scss';

export const GameListEntry = (props: { game: Game }) => {
  const joinButtonLabel = props.game.started
    ? 'Started'
    : props.game.players.length >= props.game.maxPlayers
      ? 'Full'
      : 'Join';
  const joinButtonDisabled =
    props.game.started || props.game.players.length >= props.game.maxPlayers;

  return (
    <div className="game-list-entry">
      <div className="game-list-entry-name">{props.game.name}'s Game</div>
      <div className="game-list-entry-players">
        {props.game.players.length} / {props.game.maxPlayers}
      </div>
      <button className="game-list-entry-join" disabled={joinButtonDisabled}>
        {props.game.password && <FontAwesomeIcon icon={faLock} />}
        {joinButtonLabel}
      </button>
    </div>
  );
};
