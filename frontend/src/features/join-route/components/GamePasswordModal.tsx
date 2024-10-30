import {
  FormEventHandler,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

export const GamePasswordModal = forwardRef(
  (
    props: { resolve: ((value: string | PromiseLike<string>) => void) | null },
    forwardedRef: ForwardedRef<HTMLDialogElement>,
  ) => {
    const ref = useRef<HTMLDialogElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);

    const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
      ev.preventDefault();
      const password = new FormData(ev.target as HTMLFormElement).get(
        'password',
      ) as string;
      if (props.resolve) props.resolve(password);
      ref.current?.close();
    };
    return (
      <dialog ref={ref} className="game-password-modal-dialog">
        <div className="game-password-modal">
          <form onSubmit={onSubmit}>
            <input
              className="game-password-modal-input"
              name="password"
              autoComplete="off"
              placeholder="Password"
            />
            <button type="submit">OK</button>
          </form>
        </div>
      </dialog>
    );
  },
);
