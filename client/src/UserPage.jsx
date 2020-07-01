import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ListGroup, Button, Tab, Col } from "react-bootstrap";

import LoadingScreen from "./LoadingScreen";
import deleteAllCookies from "./utils/cookies";
import Popup from "./Popup";
import PollItem from "./PollItem";

import { authUser } from "./store/actions/index";

function UserPage(props) {
  let [userPolls, setUserPolls] = useState([]);
  let [loading, setLoading] = useState(false);
  let [showPopup, setShowPopup] = useState(false);
  let [polls, setPolls] = useState([]);
  //загрузить голсования созданные пользователем при загрузке страницы
  useEffect(() => {
    console.log(props.username)
    if (props.username) {
      async function getPolls() {
        setLoading(true);
        let res = await fetch(`/poll/${props.username}/polls`);
        let ans = await res.json();
        setUserPolls(ans.polls);
        setLoading(false);
      }
      getPolls();
    }
  }, [props.username]);
  useEffect(() => {
    let pollList = [];
    if (userPolls.length > 0) {
      pollList = userPolls.map((poll, index) => {
        return <PollItem key={poll._id} poll={poll} />
      }
      );
    }
    setPolls(pollList);
  }, [userPolls]);

  function togglePopup() {
    setShowPopup(!showPopup);
  }
  async function handleDelete() {
    let data = {
      username: props.username
    }
    let ans = await fetch(`/auth/user/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
        credentials: "include",
        body: JSON.stringify(data)
      });
    let res = await ans.json();
    if (res.success) {
      props.dispatch(authUser(""));
      localStorage.clear();
      deleteAllCookies();
    }
  }
  if (props.username === "") {
    return <h1>You must be logged in to view this page</h1>;
  }
  return loading ? <LoadingScreen /> : (
    <div className="profile">
      <h2 className="text-center text--teal">My Account</h2>
      <Tab.Container defaultActiveKey="#polls">
        <Col>
          <ListGroup>
            <ListGroup.Item action href="#polls">
              User polls
          </ListGroup.Item>
            <ListGroup.Item action href="#settings">
              Settings
          </ListGroup.Item>
          </ListGroup>

        </Col>
        <Col>
          <Tab.Content>
            <Tab.Pane eventKey="#polls">
              <ListGroup variant="flush">
                {polls}
              </ListGroup>
            </Tab.Pane>
            <Tab.Pane eventKey="#settings" className="text-center">
              <Button className="delete" onClick={togglePopup} variant="danger">Delete profile</Button>
            </Tab.Pane>
          </Tab.Content>
        </Col>
        {showPopup && <Popup close={togglePopup.bind(this)} delete={handleDelete.bind(this)} />}
      </Tab.Container>
    </div>
  )
}



const mapStateToProps = state => {
  return {
    username: state.username,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);