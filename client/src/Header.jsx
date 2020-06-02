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
          <Nav.Link  eventKey="1" >Features</Nav.Link>
          <Nav.Link  eventKey="2"  >Pricing</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

export default Header;