import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import AuthForm from "./AuthForm";
import CreatePollForm from "./CreatePoll";

function App() {
  return (
    <div className="App">
      <Header />
      <AuthForm type={"login"}/>
      <AuthForm type={"register"}/>
      <CreatePollForm />
    </div>
  );
}

export default App;
