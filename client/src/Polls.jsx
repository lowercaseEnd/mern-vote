import React, { useState } from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";

import PollItem from "./PollItem";

function Polls(props) {
  let [currentPage, setCurrentPage] = useState(1);
  let [pollsPerPage, setPollsPerPage] = useState(5);

  const pollList = props.polls.map((poll, index) => {
    return <PollItem key={poll._id} poll={poll} />
  });
  //отображение нескольких голосование на странице
  const indexOfLastPoll = currentPage * pollsPerPage;
  const indexOfFirstPoll = indexOfLastPoll - pollsPerPage;
  const currentPolls = pollList.slice(indexOfFirstPoll, indexOfLastPoll);
  //отображение номеров страниц
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pollList.length / pollsPerPage); i++) {
    pageNumbers.push(<Button type="button" onClick={() => setCurrentPage(i)}>{i}</Button>);
  }
  return (
    <div className="background--green">
      <section className="shadow list">
        <ListGroup variant="flush" className="chart-card">
          {currentPolls}
        </ListGroup>
        <div className="text-center">
          {pageNumbers}
        </div>
      </section>
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
