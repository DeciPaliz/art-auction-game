import { useAppSelector } from '@/shared/hooks/store';
import { useListGamesQuery } from '../../../shared/api/games.api';
import { GameList } from '../components/GameList';
import { JoinButtons } from '../components/JoinButtons';

const JoinRoute = () => {
  const options = useAppSelector((state) => state.join.gameListOptions);
  const { data, error, isFetching, refetch } = useListGamesQuery(options, {
    pollingInterval: 5000,
  });

  return (
    <>
      <JoinButtons refreshing={isFetching} refetch={refetch} />
      <GameList games={data} error={error} />
    </>
  );
};

export default JoinRoute;
