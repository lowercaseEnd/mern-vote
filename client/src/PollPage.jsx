import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

function PollPage(props) {
  const { id } = useParams();
  // const [currentPoll, setPoll] = useState([]);
  if (props.polls.length === 0) {
    return <h1>Loading...</h1>
  } else {
    let currentPoll = props.polls.filter(item => item._id === id)[0];
    // console.log(props.polls);
    let options = currentPoll.options.map(option => {
      return (<div>
        <p>ID: {option._id}</p>
        <p>Option: {option.option}</p>
        <p>Votes: {option.votes}</p>
      </div>)
    });
    return (
      <div>
        <ListGroup>
          <ListGroup.Item>
            {currentPoll._id}
          </ListGroup.Item>
          <ListGroup.Item>
            {currentPoll.title}
          </ListGroup.Item>
          <ListGroup.Item>
            {options}
          </ListGroup.Item>
        </ListGroup>

      </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(PollPage);