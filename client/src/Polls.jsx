import React, { useState } from "react";
import { ListGroup, Pagination } from "react-bootstrap";
import { connect } from "react-redux";

import PollItem from "./PollItem";

import { itemsOnPage, pages } from "./utils/pagination";

function Polls(props) {
  //pagination
  let [currentPage, setCurrentPage] = useState(1);
  let [pollsPerPage, setPollsPerPage] = useState(5);

  const pollList = props.polls.map(poll => {
    return <PollItem key={poll._id} poll={poll} />
  });
  let data = {
    currentPage,
    itemsPerPage: pollsPerPage,
    listOfItems: pollList
  };
  const currentPolls = itemsOnPage(data);
  const pageNumbers = pages(pollList, pollsPerPage, currentPage, setCurrentPage);
  return (
    <div className="background--green">
      <div className="text-center">
        <h1 className="text-capitalize text--teal welcome">Welcome to Vote app!</h1>
        <p className="welcome text--teal text-center">Check out some of the great user-submitted polls below, or create your own.</p>
      </div>

      <section className="shadow list">
        <ListGroup variant="flush" className="chart-card">
          {currentPolls}
        </ListGroup>
      </section>
      <div className="text-center">
        <Pagination className="justify-content-center">{pageNumbers}</Pagination>
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    polls: state.polls,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Polls);
