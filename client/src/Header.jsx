import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  async handleLogOut() {
    const data = { username: this.props.username };
    await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": document.cookie
      },
      cache: "default",
      credentials: "include",
      body: JSON.stringify(data)
    });
    this.props.dispatch({
      type: "LOG_OUT"
    });
  }

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
            {this.props.loggedIn &&
              <Button onClick={this.handleLogOut}>Log out</Button>}
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