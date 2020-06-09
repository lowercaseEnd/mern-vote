import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


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
            {!this.props.loggedIn && <Nav.Link as={Link} to="/login">
              Login
              </Nav.Link>}
            {!this.props.loggedIn &&
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>}
            {this.props.loggedIn &&
              <Nav.Link as={Link} to="/createpoll">
                Create Poll
              </Nav.Link>}
            {this.props.loggedIn &&
              <Nav.Link as={Link} to="/profile">My profile</Nav.Link>}
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

export default connect(mapStateToProps)(Header);