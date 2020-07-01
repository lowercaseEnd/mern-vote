import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import RouteViews from "./RouteViews";
import Header from "./Header";
import Loading from './LoadingScreen';

import { loadPolls, authUser } from "./store/actions/index";


class App extends React.Component {
  componentDidMount() {
    console.log(loadPolls);
    fetch(`/poll/polls`)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        this.props.dispatch(loadPolls(res));
    });
    if (localStorage.getItem("user")) {
      document.cookie = localStorage.getItem("session");
      const username = localStorage.getItem("user");
      this.props.dispatch(authUser(username));
      // this.props.dispatch({
      //   type: "SET_CURRENT_USER",
      //   payload: {
      //     username: localStorage.getItem("user")
      //   }
      // });
    }
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <main>
           {this.props.polls === [] ? <Loading /> : <RouteViews />}
          </main>
        </Router>
      </div>
    );
  }
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
