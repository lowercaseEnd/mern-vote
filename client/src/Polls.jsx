import React, { useState } from "react";
import { ListGroup, Pagination, Button } from "react-bootstrap";
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
    pageNumbers.push(<Pagination.Item className="page-item transparent--button" onClick={() => setCurrentPage(i)} key={i}><Button type="button" disabled={currentPage === i ? true : false} variant="light" className="transparent--button">{i}</Button></Pagination.Item>);
  }
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
        <Pagination className=" justify-content-center">{pageNumbers}</Pagination>
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
