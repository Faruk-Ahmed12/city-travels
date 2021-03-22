import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";
const Header = () => {
  const [logedInUser, setloggedInUser] = useContext(UserContext);
  return (
    <div>
      <Navbar expand="lg">
        <div className="container">
          <Navbar.Brand as={Link} to="/">City Travels
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/destination">
                Destination
              </Nav.Link>
              <Nav.Link as={Link} to="/blog">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              {logedInUser.displayName ? (
                <b>
                  <span>Welcome!</span> {logedInUser.displayName}
                </b>
              ) : (
                <Nav.Link as={Link} to="/Login" className="loginMenu">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
