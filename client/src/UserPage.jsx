import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ListGroup, Button, Tab, Col, Pagination } from "react-bootstrap";

import LoadingScreen from "./LoadingScreen";
import deleteAllCookies from "./utils/cookies";
import Popup from "./Popup";
import PollItem from "./PollItem";

import { authUser } from "./store/actions/index";
import { userPolls as getUserPolls, deleteUser } from "./api/fetch";
import { itemsOnPage, pages } from "./utils/pagination";

function UserPage(props) {
  let [userPolls, setUserPolls] = useState([]);
  let [polls, setPolls] = useState([]);
  let [loading, setLoading] = useState(false);
  let [showPopup, setShowPopup] = useState(false);
  //pagination
  let [currentPage, setCurrentPage] = useState(1);
  let [pollsPerPage, setPollsPerPage] = useState(5);
  //загрузить голсования созданные пользователем при загрузке страницы
  useEffect(() => {
    if (props.username) {
      async function getPolls() {
        setLoading(true);
        let ans = await getUserPolls(props.username);
        setUserPolls(ans.polls);
        setLoading(false);
      }
      getPolls();
    }
  }, [props.username]);
  useEffect(() => {
    let pollList = [];
    setLoading(true);
    if (userPolls.length > 0) {
      pollList = userPolls.map((poll, index) => {
        return <PollItem key={poll._id} poll={poll} />
      }
      );
    }
    setLoading(false);
    setPolls(pollList);
  }, [userPolls]);

  function togglePopup() {
    setShowPopup(!showPopup);
  }
  async function handleDelete() {
    let data = {
      username: props.username
    }
    let res = await deleteUser(data);
    if (res.success) {
      props.dispatch(authUser(""));
      localStorage.clear();
      deleteAllCookies();
    }
  }
  if (props.username === "") {
    return <h1>You must be logged in to view this page</h1>;
  }
  let data = {
    currentPage,
    itemsPerPage: pollsPerPage,
    listOfItems: polls
  };
  const currentPolls = itemsOnPage(data);
  const pageNumbers = pages(polls, pollsPerPage, currentPage, setCurrentPage);
  return (
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
        {loading && <LoadingScreen />}
        <Col>
          <Tab.Content>
            <Tab.Pane eventKey="#polls">
              <ListGroup variant="flush">
                {currentPolls}
              </ListGroup>
              <div className="text-center">
                <Pagination className="justify-content-center">{pageNumbers}</Pagination>
              </div>
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