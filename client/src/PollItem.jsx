import React from "react";
import { ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Pie } from "react-chartjs-2";


const color = () => {
  return (`#${Math.random().toString(16).slice(2, 8)}`);
}

function PollItem(props) {
  let history = useHistory();

  function handleClick(id) {
    history.push(`/poll/${id}`);
  }
  const data = {
    labels: props.poll.options.map(option => option.option),
    datasets: [
      {
        label: props.poll.title, backgroundColor: props.poll.options.map(() => color()),
        data: props.poll.options.map(option => option.votes)
      }
    ]
  }
  return (
    <ListGroupItem action onClick={() => handleClick(props.poll._id)} >
      <h3 className="text-center text-capitalize text--teal">{props.poll.title}</h3>
      <Pie data={data} />
    </ListGroupItem>
  );
}

export default PollItem;