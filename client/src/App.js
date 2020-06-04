import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import AuthForm from "./AuthForm";
import CreatePollForm from "./CreatePoll";
import Polls from "./Polls";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      loggedIn: false
    };
    this.getAuthStatus = this.getAuthStatus.bind(this);
  }
  async getAuthStatus() {
    let res = await fetch("http://localhost:4000/isauthenticated");
    let ans = await res.json();
    console.log(res);
    console.log(ans);
    const { user } = ans;
    this.setState({
      user,
      loggedIn: !!user
    })
  }
  componentDidMount() {
    this.getAuthStatus();
  }
  render() {
    return (
      <div className="App">
        <Header />
        <AuthForm type={"login"} />
        <AuthForm type={"register"} />
        <CreatePollForm />
        <Polls />

      </div>
    );
  }

}

export default App;
