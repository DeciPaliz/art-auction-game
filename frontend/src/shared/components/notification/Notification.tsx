import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import './Notification.scss';
import { MouseEventHandler, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import {
  closeNotification,
  nextInQueue,
} from '@/shared/store/notification.slice';

const readyTime = 1000;

export const Notification = () => {
  const state = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDialogElement>(null);

  const onReady = () => {
    if (state.queue.length === 0) return;
    dispatch(nextInQueue());
  };

  let closeTimeout: NodeJS.Timeout;

  useEffect(() => {
    clearTimeout(closeTimeout);

    if (state.shown) {
      ref.current?.show();
      if (state.disappearTime !== -1) {
        closeTimeout = setTimeout(
          () => dispatch(closeNotification()),
          state.disappearTime,
        );
      }
      return;
    }

    ref.current?.close();
    setTimeout(onReady, readyTime);
  }, [state.shown]);

  const onClick: MouseEventHandler<HTMLDialogElement> = (ev) => {
    ev.preventDefault();
    clearTimeout(closeTimeout);
    dispatch(closeNotification());
  };

  return (
    <dialog ref={ref} onClick={onClick} className="app-notification">
      <div className="app-notification-header">
        <FontAwesomeIcon icon={faInfo} /> {state.header}
      </div>
      {state.message}
    </dialog>
  );
};
