import { EventEmitter } from 'events';
import { createContext } from '../util/context';

export const [JoinContext, JoinContextProvider, useJoinContext] =
  createContext<{ ee: EventEmitter }>(() => ({ ee: new EventEmitter() }));
