import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';
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
        type: "LOAD_POSTS",
        payload: res
      }));
  }
  componentDidUpdate() {
    fetch(`http://localhost:4000/poll/polls`)
      .then(response => response.json())
      .then(res => this.props.dispatch({
        type: "LOAD_POSTS",
        payload: res
      }));
  }
  render() {
    const { username, posts } = this.props;
    return (
      <div className="App">
        <p>{username}</p>
        <Router>
          <Header />
          <RouteViews />
        </Router>


      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    username: state.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
