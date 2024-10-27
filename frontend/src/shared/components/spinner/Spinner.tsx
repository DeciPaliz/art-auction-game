import './Spinner.scss';
import './dots.scss';

export const Spinner = (props?: {
  center?: boolean;
  small?: boolean;
  color?: 'white' | 'black';
}) => {
  const color = props?.color ?? 'white';

  return (
    <div
      className={`app-spinner-dots app-spinner-dots${'-' + color} ${props?.small ? 'app-spinner-dots-small' : ''} ${props?.center ? 'app-spinner-center' : ''}`}
    />
  );
};
