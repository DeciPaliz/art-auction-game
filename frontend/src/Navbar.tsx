import {
  Nav,
  Navbar as Navbar_,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
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
          <NavLink tag={Link} to="/join">
            Join
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/play">
            Play
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/upload">
            Upload
          </NavLink>
        </NavItem>
      </Nav>
      <Nav navbar>
        <NavItem>
          <NavLink tag={Link} to="/signin" className="ml-auto">
            Sign In
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar_>
  );
};
