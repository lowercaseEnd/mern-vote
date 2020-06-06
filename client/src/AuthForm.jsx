import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
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
    // let ret = await auth(this.props.type, data);
    let response = await fetch(`http://localhost:4000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": document.cookie
        },
        cache: "default",
        credentials: "include",
        body: JSON.stringify(data)
      });
    // let response = await axios.post("http://127.0.0.1:4000/auth/login", {
    // username, password
    // });
    console.log(response);
    console.log(document.cookie)
    // if(ret.success) {
    //   this.props.dispatch({
    //     type: "SET_CURRENT_USER",
    //     payload: {
    //       user: ret.username
    //     }
    //   });
    // }
    // this.setState({
    //   username: "",
    //   password: ""
    // });
    // Cookies.set("connect.sid", document.cookie["connect.sid"]);
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
        <Button type="submit">{this.props.type}</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loggedIn: state.loggedIn
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);