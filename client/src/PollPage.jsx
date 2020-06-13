import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ListGroup, Form, Button } from "react-bootstrap";
import { Pie } from "react-chartjs-2";

import Popup from "./Popup";

const color = () => {
  return (`#${Math.random().toString(16).slice(2, 8)}`);
}

function PollPage(props) {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  //пока данные не прогрузились показывать надпись
  if (props.polls.length === 0) {
    return <h1>Loading...</h1>
  } else {

    let currentPoll = props.polls.filter(item => item._id === id)[0];
    if (currentPoll === undefined) {
      return <h1>No poll found</h1>
    }
    const data = {
      labels: currentPoll.options.map(option => option.option),
      datasets: [
        {
          label: currentPoll.title, backgroundColor: currentPoll.options.map(() => color()),
          data: currentPoll.options.map(option => option.votes)
        }
      ]
    }
    let options = currentPoll.options.map((option, index) => {
      return (<>
        <Form.Check type="radio" id={`radio-${index + 1}`} name="radioOption" onClick={() => { handleChange(option.option) }} inline />
        <Form.Label htmlFor={`radio${index + 1}`}>{option.option}</Form.Label>
        <p>Votes: {option.votes}</p>

      </>)
    });
    async function handleChange(option) {
      let res = await fetch(`http://localhost:4000/poll/${props.username}/polls/${id}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        cache: "default",
        credentials: "include",
        body: JSON.stringify({
          "selectedOption": option
        })
      });
      let ans = await res.json();
      if (ans.success) {
        let temp = props.polls.map((poll) => {
          if (poll._id === ans.poll._id) {
            return ans.poll;
          } else {
            return poll;
          }
        });
        props.dispatch({
          type: "LOAD_POLLS",
          payload: temp
        });
      }
    }
    function togglePopup() {
      setShowPopup(!showPopup);
    }
    async function handleDelete() {
      setShowPopup(!showPopup);
    }
    async function deletePoll() {
      await fetch(`http://localhost:4000/poll/delete`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        cache: "default",
        credentials: "include",
        body: JSON.stringify({
          "id": currentPoll._id
        })
      });
      await fetch(`http://localhost:4000/poll/polls`)
        .then(response => response.json())
        .then(res => props.dispatch({
          type: "LOAD_POLLS",
          payload: res
        }));
    }
    return (
      <div>
        <ListGroup>
          <ListGroup.Item>
            <h3 className="text-center text-capitalize text--teal">{currentPoll.title}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            {options}
          </ListGroup.Item>
          <ListGroup.Item>
            <Pie data={data} />
          </ListGroup.Item>
        </ListGroup>
        {props.loggedIn && <Button onClick={handleDelete}>Delete poll</Button>}
        {showPopup && <Popup close={togglePopup} delete={deletePoll} />}
      </div>

    );
  }

}


const mapStateToProps = state => {
  return {
    polls: state.polls,
    username: state.username,
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PollPage);