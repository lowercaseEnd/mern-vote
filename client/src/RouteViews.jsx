import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import AuthForm from "./AuthForm";
import Polls from "./Polls";
import CreatePoll from "./CreatePoll";

const Routes = () => {
  return (
    <Switch>
      <Route path="/register">
        <AuthForm authType="register" />
      </Route>
      <Route path="/login">
        <AuthForm authType="login" />
      </Route>
      <Route path="/createpoll">
        <CreatePoll />
      </Route>
      <Route path="/">
        <Polls />
      </Route>
    </Switch>
  );
};

export default Routes;