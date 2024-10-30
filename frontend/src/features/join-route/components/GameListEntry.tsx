import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Game, useJoinGameMutation } from '../../../shared/api/game.api';
import './GameListEntry.scss';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { showNotification } from '@/shared/store/notification.slice';
import { useNavigate } from 'react-router-dom';

export const GameListEntry = (props: {
  game: Game;
  askPassword: () => Promise<string>;
}) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [join] = useJoinGameMutation();

  const joinButtonLabel = props.game.started
    ? 'Started'
    : props.game.players.length >= props.game.maxPlayers
      ? 'Full'
      : 'Join';
  const joinButtonDisabled =
    props.game.started || props.game.players.length >= props.game.maxPlayers;

  const tryJoining = async (options: { gameId: number; password?: string }) => {
    const res = (await join(options)) as {
      error?: { data?: { message?: string } };
    };
    if (res.error) {
      const errorMessage =
        res.error?.data?.message === undefined
          ? 'Unknown error'
          : res.error.data.message.at(0)?.toUpperCase() +
            res.error.data.message.slice(1);

      dispatch(showNotification(errorMessage));
      return;
    }
    navigate('/play');
  };

  const onJoin = async () => {
    if (!accessToken) {
      dispatch(showNotification('You need to sign in first'));
      return;
    }

    if (!props.game.password) {
      try {
        await tryJoining({ gameId: props.game.hostId });
      } catch (reason) {
        dispatch(showNotification(reason as string));
      }
      return;
    }

    try {
      const password = await props.askPassword();
      await tryJoining({ gameId: props.game.hostId, password });
    } catch (reason) {
      dispatch(showNotification(reason as string));
    }
  };

  return (
    <div className="game-list-entry">
      <div className="game-list-entry-name">{props.game.name}'s Game</div>
      <div className="game-list-entry-players">
        {props.game.players.length} / {props.game.maxPlayers}
      </div>
      <button
        className="game-list-entry-join"
        disabled={joinButtonDisabled}
        onClick={onJoin}
      >
        {props.game.password && <FontAwesomeIcon icon={faLock} />}
        {joinButtonLabel}
      </button>
    </div>
  );
};
