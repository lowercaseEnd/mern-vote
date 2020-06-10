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

    let currentPoll = props.polls.filter(item => item._id === id)[0];
    let options = currentPoll.options.map((option, index) => {
      return (<>
        <Form.Check type="radio" id={`radio${index + 1}`} name="radioOption" onChange={() => { handleChange(option.option) }} inline />
        <Form.Label htmlFor={`radio${index + 1}`}>{option.option}</Form.Label>
        <p>Votes: {option.votes}</p>
      </>)
    });
    async function handleChange(option) {
      await fetch(`http://localhost:4000/poll/${props.username}/polls/${id}`, {
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
    }
    async function handleSubmit(event) {
      event.preventDefault();
      console.log(event.target.name)
      console.log(event.target.value)
      let data = {};

    }
    return (
      <div>
        <ListGroup onSubmit={handleSubmit}>
          <ListGroup.Item>
            {currentPoll._id}
          </ListGroup.Item>
          <ListGroup.Item>
            {currentPoll.title}
          </ListGroup.Item>
          <ListGroup.Item>
            {options}
          </ListGroup.Item>
          <Button type="submit">Vote</Button>
        </ListGroup>

      </div>

    );
  }

}


const mapStateToProps = state => {
  return {
    polls: state.polls,
    username: state.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PollPage);