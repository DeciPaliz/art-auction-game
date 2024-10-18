import { EventEmitter } from 'events';
import { useEffect } from 'react';

export const useEmitterOn = (
  ee: EventEmitter,
  eventName: string | symbol,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (...args: any[]) => void,
) => {
  useEffect(() => {
    ee.on(eventName, listener);
    return () => {
      ee.off(eventName, listener);
    };
  }, []);
};

export const useEmitterOnce = (
  ee: EventEmitter,
  eventName: string | symbol,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (...args: any[]) => void,
) => {
  useEffect(() => {
    ee.once(eventName, listener);
    return () => {
      ee.off(eventName, listener);
    };
  }, []);
};
