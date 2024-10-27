import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

export const Navbar = () => {
  const location = useLocation();

  const link = (title: string, to?: string) => {
    to = to ?? '/' + title.toLowerCase();
    return (
      <Link
        to={to}
        className={location.pathname === to ? 'app-navbar-active' : undefined}
      >
        {title}
      </Link>
    );
  };

  return (
    <nav className="app-navbar">
      <ul>
        <li>
          <Link to="/" className="app-navbar-title">
            Art Auction Game
          </Link>
        </li>
        <li>{link('Join')}</li>
        <li>{link('Play')}</li>
        <li>{link('Upload')}</li>
        <li>
          <input
            type="button"
            onClick={() => console.log('click')}
            value="Sign in"
          />
        </li>
      </ul>
    </nav>
  );
};
