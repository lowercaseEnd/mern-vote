import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import RouteViews from "./RouteViews";
import Header from "./Header";


class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    fetch(`http://localhost:4000/poll/polls`)
      .then(response => response.json())
      .then(res => this.props.dispatch({
        type: "LOAD_POLLS",
        payload: res
      }));
    if (localStorage.getItem("user")) {
      document.cookie = localStorage.getItem("session");
      this.props.dispatch({
        type: "SET_CURRENT_USER",
        payload: {
          username: localStorage.getItem("user")
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <RouteViews />
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

export default connect(null, mapDispatchToProps)(App);
