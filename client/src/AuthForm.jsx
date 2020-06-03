import React from "react";
import { Form, Button } from "react-bootstrap";

import { auth } from "./api/fetch";

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
    let ret = await auth(this.props.type, data);
    console.log(ret);
    this.setState({
      username: "",
      password: ""
    });
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

export default LoginForm;