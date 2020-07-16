import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { auth } from "./api/fetch";
import { Redirect } from "react-router-dom";

import { authUser } from "./store/actions/index";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    try {
      const { username, password } = this.state;
      const data = { username, password };
      let result = await auth(this.props.authType, data);
      if (result.success) {
        localStorage.setItem("user", result.username);
        let session = document.cookie.split(";")[0];
        localStorage.setItem("session", session);
        this.props.dispatch(authUser(result.username));
      } else {
        if (this.props.authType === "login") {
          this.setState({
            error: "Incorrect username and/or password"
          });
        } else {
          this.setState({
            error: "Username is already taken"
          });
        }
      }
    } catch (err) {
      console.log(err);
      if (this.props.authType === "login") {
        this.setState({
          error: "Incorrect username and/or password"
        });
      } else {
        this.setState({
          error: "Username is already taken"
        });
      }
    }

  }
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/" />
    }
    const { username, password } = this.state;
    return (
      <section className="text-center auth">
        <Form className="auth__form" onSubmit={this.handleSubmit}>
          {this.state.error && <p className="alert alert-warning">{this.state.error}</p>}
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
          </Form.Group>
          <Button type="submit">{this.props.authType}</Button>
        </Form>
      </section>

    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    loggedIn: state.loggedIn
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);