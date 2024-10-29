import { useAppSelector } from '@/shared/hooks/store';

export const AuthButton = (props: { onClick: () => void }) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const authState = useAppSelector((state) => state.auth.authState);

  const buttonLabel =
    accessToken !== null
      ? 'Log out'
      : authState === 'signin'
        ? 'Sign in'
        : 'Sign up';

  return <input type="button" onClick={props.onClick} value={buttonLabel} />;
};
