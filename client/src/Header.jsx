import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logOut } from "./store/actions/index";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  async handleLogOut() {
    const data = { username: this.props.username };
    await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": document.cookie
      },
      cache: "default",
      credentials: "include",
      body: JSON.stringify(data)
    });
    this.props.dispatch(logOut());
    localStorage.clear();
    document.cookie = "";
  }

  render() {
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
            {!this.props.loggedIn && <Nav.Link as={Link} to="/login" className="text-light" >
              Login
              </Nav.Link>}
            {!this.props.loggedIn &&
              <Nav.Link as={Link} to="/register" className="text-light">
                Register
              </Nav.Link>}
            {this.props.loggedIn &&
              <Nav.Link as={Link} to="/createpoll" className="text-light">
                Create Poll
              </Nav.Link>}
            {this.props.loggedIn &&
              <Nav.Link as={Link} to="/profile" className="text-light">My profile</Nav.Link>}
            {this.props.loggedIn &&
              <Button variant="link" onClick={this.handleLogOut}>Log out</Button>}
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  }
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