import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function PollPage(props) {
  const { id } = useParams();
  // const [currentPoll, setPoll] = useState([]);
  let currentPoll = props.polls.filter(item => item._id === id)[0];
  // console.log(props.polls);
  let options = currentPoll.options.map(option => {
    return (<div>
      <p>ID: {option._id}</p>
      <p>Votes: {option.votes}</p>
    </div>)
  });
  console.log(currentPoll)
  // console.log(currentPoll.options.length)
  // currentPoll.options.map(option => console.log(option));
  return (
    <div>
      <ul>
        <li>
          {currentPoll._id}
        </li>
        <li>
          {currentPoll.title}
        </li>
        <li>
          {options}
        </li>
      </ul>

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
export default connect(mapStateToProps, mapDispatchToProps)(PollPage);