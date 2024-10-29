import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { AuthButton } from '@/features/auth/components/AuthButton';
import { AuthModal } from '@/features/auth/components/AuthModal';
import './Navbar.scss';

export const Navbar = () => {
  const location = useLocation();
  const modalRef = useRef<HTMLDialogElement>(null);

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
    <>
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
            <AuthButton onClick={() => modalRef.current?.showModal()} />
          </li>
        </ul>
      </nav>
      <AuthModal ref={modalRef} />
    </>
  );
};
