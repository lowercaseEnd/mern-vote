import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import RouteViews from "./RouteViews";
import Header from "./Header";
import Loading from './LoadingScreen';

import { loadPolls, authUser } from "./store/actions/index";

function App(props) {
  useEffect(() => {
    fetch(`/poll/polls`)
      .then(response => response.json())
      .then(res => {
        props.dispatch(loadPolls(res));
    });
    if (localStorage.getItem("user")) {
      document.cookie = localStorage.getItem("session");
      const username = localStorage.getItem("user");
      props.dispatch(authUser(username));
    }
  }, [])
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
         {props.polls === [] ? <Loading /> : <RouteViews />}
        </main>
      </Router>
    </div>
  );
}


const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(state => {
  return {
    polls: state.polls
  }
}, mapDispatchToProps)(App);
