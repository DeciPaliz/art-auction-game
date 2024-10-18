import { JoinContextProvider } from '../../contexts/Join.context';
import { GameList } from './GameList';
import { JoinButtons } from './JoinButtons';

const Join = () => {
  return (
    <JoinContextProvider>
      <JoinButtons />
      <GameList />
    </JoinContextProvider>
  );
};
export default Join;
