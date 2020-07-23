import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import RouteViews from "./RouteViews";
import Header from "./Header";
import Loading from './LoadingScreen';

import { loadPolls, authUser } from "./store/actions/index";
import { getPolls } from "./api/fetch";

function App(props) {
  let [loading, setLoadging] = useState(false);
  useEffect(() => {
    async function getPosts(){
      setLoadging(true);
      let res = await getPolls();
      props.dispatch(loadPolls(res));
      setLoadging(false);
    }
    getPosts();
    if (localStorage.getItem("user")) {
      // document.cookie = localStorage.getItem("session");
      const username = localStorage.getItem("user");
      props.dispatch(authUser(username));
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
         {loading ? <Loading /> : <RouteViews />}
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
