import {
  Nav,
  Navbar as Navbar_,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const location = useLocation();

  return (
    <Navbar_
      className="app-navbar"
      color="dark"
      dark
      expand
      container
      fixed="top"
    >
      <NavbarBrand tag={Link} to="/">
        Art Auction Game
      </NavbarBrand>
      <Nav navbar className="me-auto">
        <NavItem>
          <NavLink active={location.pathname === '/join'} tag={Link} to="/join">
            Join
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={location.pathname === '/play'} tag={Link} to="/play">
            Play
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={location.pathname === '/upload'}
            tag={Link}
            to="/upload"
          >
            Upload
          </NavLink>
        </NavItem>
      </Nav>
      <Nav navbar>
        <NavItem>
          <NavLink
            active={location.pathname === '/signin'}
            tag={Link}
            to="/signin"
            className="ml-auto"
          >
            Sign In
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar_>
  );
};
