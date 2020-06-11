import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ListGroup, Form, Button } from "react-bootstrap";

function PollPage(props) {
  const { id } = useParams();

  //пока данные не прогрузились показывать надпись
  if (props.polls.length === 0) {
    return <h1>Loading...</h1>
  } else {
    console.log(props.polls);
    let currentPoll = props.polls.filter(item => item._id === id)[0];
    if (currentPoll === undefined) {
      return <h1>No poll found</h1>
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
    async function handleDelete() {
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
            {currentPoll._id}
          </ListGroup.Item>
          <ListGroup.Item>
            {currentPoll.title}
          </ListGroup.Item>
          <ListGroup.Item>
            {options}
          </ListGroup.Item>
        </ListGroup>
        {props.loggedIn && <Button onClick={handleDelete}>Delete poll</Button>}
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