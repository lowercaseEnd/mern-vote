import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import AuthForm from "./AuthForm";

function App() {
  return (
    <div className="App">
      <Header />
      <AuthForm type={"login"}/>
      <AuthForm type={"register"}/>
    </div>
  );
}

export default App;
