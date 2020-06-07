import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { auth } from "./api/fetch";

// axios.defaults.withCredentials = true;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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
    const { username, password } = this.state;
    const data = { username, password };
    let response = await fetch(`http://localhost:4000/auth/${this.props.authType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": document.cookie
        },
        cache: "default",
        credentials: "include",
        body: JSON.stringify(data)
      });
    let result = await response.json();
    if(result.success) {
      this.props.dispatch({
        type: "SET_CURRENT_USER",
        payload: {
          username: result.username
        }
      });
    }
  }
  render() {
    const { username, password } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
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
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);