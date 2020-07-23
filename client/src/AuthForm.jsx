import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { auth } from "./api/fetch";
import { Redirect } from "react-router-dom";

import { authUser } from "./store/actions/index";

function LoginForm(props) {
  let [error, setError] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    const data = { username, password };
    let result = await auth(props.authType, data);
    if (result.success) {
      localStorage.setItem("user", result.username);
      let session = document.cookie.split(";")[0];
      localStorage.setItem("session", session);
      props.dispatch(authUser(result.username));
    } else {
      if (props.authType === "login") {
        setError("Incorrect username and/or password");
      } else {
        setError("Username is already taken");
      }
    }
  }

  return (
    props.loggedIn ? <Redirect to="/" /> :
      <section className="text-center auth shadow">
        <Form className="auth__form" onSubmit={(event) => handleSubmit(event)}>
          {error && <p className="alert alert-warning">{error}</p>}
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={event => setUsername(event.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={event => setPassword(event.target.value)} />
          </Form.Group>
          <Button type="submit">{props.authType}</Button>
        </Form>
      </section>
  );
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