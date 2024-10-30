import { useGetMyGameQuery } from '@shared/api/game.api';

const PlayRoute = () => {
  const { data } = useGetMyGameQuery();

  return <div>{data?.hostId}</div>;
};

export default PlayRoute;
