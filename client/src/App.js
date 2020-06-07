import React from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import AuthForm from "./AuthForm";
import CreatePollForm from "./CreatePoll";
import Polls from "./Polls";



class App extends React.Component {
  constructor(props) {
    super(props);

  }

  async componentDidMount() {
    let initPosts = await fetch(`http://localhost:4000/poll/polls`);
    let response = await initPosts.json();
    this.props.dispatch({
      type: "LOAD_POSTS",
      payload: response
    });
  }
  
  render() {
    const {username, posts} = this.props;
    return (
      <div className="App">
        <p>{username}</p>
        <Header />
        <AuthForm authType={"login"} />
        <AuthForm authType={"register"} />
        <CreatePollForm />
        <Polls />

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
