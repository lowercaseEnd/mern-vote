import React from "react";
import { Navbar, Nav } from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
    <Navbar collapseOnSelect expand="lg" sticky="top" bg="light">
      <Navbar.Brand>Vote app</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse >
        <Nav className="mr-auto">
          <Nav.Link>Main</Nav.Link>
          <Nav.Link>Login</Nav.Link>
          <Nav.Link>Register</Nav.Link>
          <Nav.Link>My polls</Nav.Link>
          <Nav.Link>My profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

export default Header;