import { ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useJoinContext } from '../../contexts/Join.context';
import { useEmitterOn } from '../../util/events';
import { useEffect, useState } from 'react';
import './GameList.css';
import { gamesList, GamesListResult } from '../../api';

export const GameList = () => {
  const { ee } = useJoinContext();

  const [games, setGames] = useState<GamesListResult>([]);

  useEmitterOn(
    ee,
    'refresh',
    async (options: {
      showStarted: boolean;
      showFull: boolean;
      showPassword: boolean;
    }) => {
      setGames(
        await gamesList({
          noPassword: !options.showPassword,
          unavailable: options.showFull,
          started: options.showStarted,
        }),
      );
      ee.emit('refreshed');
    },
  );

  useEffect(() => {
    ee.emit('refresh', { showPassword: true });
  }, []);

  return (
    <div className="game-list">
      {games.map((game) => {
        const full = game.players.length >= game.maxPlayers;
        const disabled = game.started || full;

        return (
          <ListGroup key={game.hostId} className="game-list-el" horizontal>
            <ListGroupItem className="game-list-el-name" disabled={disabled}>
              {game.name}'s Game
            </ListGroupItem>
            <ListGroupItem className="game-list-el-players" disabled={disabled}>
              {game.players.length} / {game.maxPlayers}
            </ListGroupItem>
            <ListGroupItem
              className="game-list-el-join"
              action
              disabled={disabled}
              color="primary"
              tag="button"
            >
              {game.password && (
                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
              )}{' '}
              {game.started ? 'Started' : full ? 'Full' : 'Join'}
            </ListGroupItem>
          </ListGroup>
        );
      })}
    </div>
  );
};
