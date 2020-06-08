import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";



class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" sticky="top" bg="light">
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            Vote app
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse >
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Main
              </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
              </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
              </Nav.Link>
            <Nav.Link as={Link} to="/createpoll">
              Create Poll
              </Nav.Link>
            <Nav.Link as={Link} to="/profile">My profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  }
}

export default Header;