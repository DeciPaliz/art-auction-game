import { useAppSelector } from '@shared/hooks/store';
import { useListGamesQuery } from '@shared/api/game.api';
import { GameList } from '../components/GameList';
import { JoinButtons } from '../components/JoinButtons';
import { GamePasswordModal } from '../components/GamePasswordModal';
import { useRef, useState } from 'react';

const JoinRoute = () => {
  const options = useAppSelector((state) => state.join.gameListOptions);
  const { data, error, isFetching, refetch } = useListGamesQuery(options, {
    pollingInterval: 5000,
  });

  const ref = useRef<HTMLDialogElement>(null);
  const [passwordResolve, setPasswordResolve] = useState<
    ((value: string | PromiseLike<string>) => void) | null
  >(null);

  const askPassword = () => {
    ref.current?.showModal();
    return new Promise<string>((resolve) => {
      setPasswordResolve(() => resolve);
    });
  };

  return (
    <>
      <JoinButtons refreshing={isFetching} refetch={refetch} />
      <GameList games={data} error={error} askPassword={askPassword} />
      <GamePasswordModal ref={ref} resolve={passwordResolve} />
    </>
  );
};

export default JoinRoute;
