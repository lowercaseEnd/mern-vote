import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ListGroup, Form, Button } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { interpolateInferno } from "d3-scale-chromatic";

import Popup from "./Popup";

import { interpolateColors } from "./utils/color-generator";

function PollPage(props) {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);

  //пока данные не прогрузились показывать надпись
  if (props.polls.length === 0) {
    return <h1>Loading...</h1>
  } else {

    let currentPoll = props.polls.filter(item => item._id === id)[0];
    let colorRangeInfo = {
      colorStart: 0.2,
      colorEnd: 1,
      useEndAsStart: false
    }
    let colors = interpolateColors(currentPoll.options.length, interpolateInferno, colorRangeInfo);
    if (currentPoll === undefined) {
      return <h1>No poll found</h1>
    }
    const data = {
      labels: currentPoll.options.map(option => option.option),
      datasets: [
        {
          label: currentPoll.title, backgroundColor: colors,
          data: currentPoll.options.map(option => option.votes)
        }
      ]
    }
    let options = currentPoll.options.map((option, index) => {
      return (<ListGroup.Item>
        <Form.Check type="radio" id={`radio-${index + 1}`} name="radioOption" onClick={() => { handleChange(option.option) }} inline />
        <Form.Label class="float-right" htmlFor={`radio-${index + 1}`}>{option.option}</Form.Label>
        <p>Votes: {option.votes}</p>

      </ListGroup.Item>)
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
          "id": currentPoll._id,
          "username": props.username
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
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3 className="text-center text-capitalize text--teal">{currentPoll.title}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <ListGroup>
              {options}
            </ListGroup>
          </ListGroup.Item>
          <ListGroup.Item>
            <Pie data={data} />
          </ListGroup.Item>
        </ListGroup>
        {props.loggedIn &&
          <div className="text-center"><Button className="align-center" onClick={handleDelete}>Delete poll</Button></div>}
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