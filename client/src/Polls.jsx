import React from "react";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";

import PollItem from "./PollItem";

function Polls(props) {
  console.log(props.polls)
  const pollList = props.polls.map((poll, index) => {
    console.log(poll, index);
    return <PollItem  key={poll._id} poll={poll} />
  }
  )
  return (
    <ListGroup variant="flush">
      {pollList}
    </ListGroup>
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
