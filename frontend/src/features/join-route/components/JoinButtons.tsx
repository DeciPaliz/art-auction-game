import { useAppDispatch, useAppSelector } from '@shared/hooks/store';
import './JoinButtons.scss';
import {
  switchPassword,
  switchStarted,
  switchUnavailable,
} from '../store/join.slice';

export const JoinButtons = (props: {
  refreshing: boolean;
  refetch: () => unknown;
}) => {
  const options = useAppSelector((state) => state.join.gameListOptions);
  const dispatch = useAppDispatch();

  return (
    <div className="app-join-buttons">
      <div className="app-join-buttons-refresh-group">
        <button className="app-join-buttons-btn" onClick={props.refetch}>
          Refresh
        </button>
        <label>
          <input
            type="checkbox"
            checked={!options.noPassword}
            onChange={() => dispatch(switchPassword())}
          />
          Show games with password
        </label>
        <label>
          <input
            type="checkbox"
            checked={options.started}
            onChange={() => dispatch(switchStarted())}
          />
          Show started games
        </label>
        <label>
          <input
            type="checkbox"
            checked={options.unavailable}
            onChange={() => dispatch(switchUnavailable())}
          />
          Show full games
        </label>
      </div>
      <button className="app-join-buttons-btn">Create</button>
    </div>
  );
};
