import React from "react";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory, Route } from "react-router-dom";

import PollItem from "./PollItem";


class Polls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListGroup variant="flush">
        {this.props.polls.map(poll => {
          return (<PollItem key={poll._id} poll={poll} />
          )
        })}
      </ListGroup>
    );
  }
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
