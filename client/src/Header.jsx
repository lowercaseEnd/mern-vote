import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logOut } from "./store/actions/index";
import { logout } from "./api/fetch";

function Header(props) {
  async function handleLogOut() {
    const data = { username: props.username };
    await logout(data);
    props.dispatch(logOut());
    localStorage.clear();
    document.cookie = "";
  }
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" className="bg-teal text-light">
      <Navbar.Brand>
        <Nav.Link className="text-light" as={Link} to="/">
          Vote app
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle className="navbar-dark" />
      <Navbar.Collapse>
        <Nav className="mr-auto text-center">
          <Nav.Link as={Link} to="/" className="text-light">
            Main
            </Nav.Link>
          {!props.loggedIn && <Nav.Link as={Link} to="/login" className="text-light" >
            Login
            </Nav.Link>}
          {!props.loggedIn &&
            <Nav.Link as={Link} to="/register" className="text-light">
              Register
            </Nav.Link>}
          {props.loggedIn &&
            <Nav.Link as={Link} to="/createpoll" className="text-light">
              Create Poll
            </Nav.Link>}
          {props.loggedIn &&
            <Nav.Link as={Link} to="/profile" className="text-light">My profile</Nav.Link>}
          {props.loggedIn &&
            <Button variant="link" onClick={handleLogOut}>Log out</Button>}
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    username: state.username
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);