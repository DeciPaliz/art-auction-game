import {
  FormEventHandler,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './AuthModal.scss';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import {
  clearAccessToken,
  setAccessToken,
  switchState,
} from '@/shared/store/auth.slice';
import {
  useClearMutation,
  useSignInMutation,
  useSignUpMutation,
} from '@/shared/api/auth.api';

export const AuthModal = forwardRef(
  (_props: object, forwardedRef: ForwardedRef<HTMLDialogElement>) => {
    const authState = useAppSelector((state) => state.auth.authState);
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDialogElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);

    const [problemMessage, setProblemMessage] = useState('');
    const [problems, setProblems] = useState<{
      email?: boolean;
      username?: boolean;
      password?: boolean;
      confirmPassword?: boolean;
    }>({});

    const clearProblem = () => {
      setProblemMessage('');
      setProblems({});
    };

    const [clear] = useClearMutation();
    const [signUp] = useSignUpMutation();
    const [signIn] = useSignInMutation();

    const onSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
      ev.preventDefault();
      clearProblem();

      if (accessToken !== null) {
        ref.current?.close();
        await clear();
        dispatch(clearAccessToken());
        return;
      }

      const data = new FormData(ev.target as HTMLFormElement);

      if (!data.get('email')) {
        setProblemMessage('Please input a valid e-mail');
        setProblems({ email: true });
        return;
      }

      if (authState === 'signup' && !data.get('name')) {
        setProblemMessage('Please input a valid username');
        setProblems({ username: true });
        return;
      }

      if (!data.get('password')) {
        setProblemMessage('Please input a valid password');
        setProblems({ password: true });
        return;
      }

      if (
        authState === 'signup' &&
        (data.get('password') as string) !==
          (data.get('confirmPassword') as string)
      ) {
        setProblemMessage('Passwords do not match');
        setProblems({ confirmPassword: true });
        return;
      }

      if (authState === 'signup') {
        const result = await signUp({
          email: data.get('email') as string,
          name: data.get('name') as string,
          password: data.get('password') as string,
        });
        if (result.error) {
          setProblemMessage('An account with these credentials already exists');
          setProblems({
            email: true,
            username: true,
            password: true,
            confirmPassword: true,
          });
          return;
        }

        ref.current?.close();
        dispatch(setAccessToken(result.data.access_token));
        return;
      }

      const result = await signIn({
        email: data.get('email') as string,
        password: data.get('password') as string,
      });
      if (result.error) {
        setProblemMessage('Invalid email and/or password');
        setProblems({
          email: true,
          password: true,
        });
        return;
      }
      ref.current?.close();
      dispatch(setAccessToken(result.data.access_token));
    };

    const thisTitle =
      accessToken !== null
        ? 'Log out'
        : authState === 'signin'
          ? 'Sign in'
          : 'Sign up';
    const otherTitle = authState === 'signin' ? 'Sign up' : 'Sign in';

    const signInAndUpContent = (
      <>
        <input
          type="email"
          name="email"
          className={problems.email ? 'auth-modal-problem-input' : ''}
          autoComplete="email"
          onPointerDown={clearProblem}
          placeholder="E-Mail"
        />
        {authState === 'signup' && (
          <input
            placeholder="Username"
            className={problems.username ? 'auth-modal-problem-input' : ''}
            onPointerDown={clearProblem}
            name="name"
            autoComplete="username"
          />
        )}
        <input
          type="password"
          name="password"
          className={
            problems.password || problems.confirmPassword
              ? 'auth-modal-problem-input'
              : ''
          }
          onPointerDown={clearProblem}
          placeholder="Password"
          autoComplete={
            authState === 'signup' ? 'new-password' : 'current-password'
          }
        />
        {authState === 'signup' && (
          <input
            type="password"
            name="confirmPassword"
            className={
              problems.confirmPassword ? 'auth-modal-problem-input' : ''
            }
            onPointerDown={clearProblem}
            placeholder="Confirm password"
            autoComplete="off"
          />
        )}
      </>
    );

    const logOutContent = <>Are you sure you want to log out?</>;

    const signInAndUpButtons = (
      <>
        <button className="auth-modal-action" type="submit">
          {thisTitle}
        </button>
        <button type="button" onClick={() => dispatch(switchState())}>
          {otherTitle} instead
        </button>
      </>
    );

    const logOutButtons = (
      <>
        <button className="auth-modal-logout" type="submit">
          Log out
        </button>
        <button type="button" onClick={() => ref.current?.close()}>
          Cancel
        </button>
      </>
    );

    return (
      <dialog className="auth-modal" ref={ref}>
        <h1>{thisTitle}</h1>
        <form onSubmit={onSubmit}>
          {accessToken === null ? signInAndUpContent : logOutContent}
          {problemMessage !== '' && (
            <div className="auth-modal-problem">{problemMessage}</div>
          )}
          <div className="auth-modal-buttons">
            {accessToken === null ? signInAndUpButtons : logOutButtons}
          </div>
        </form>
      </dialog>
    );
  },
);
