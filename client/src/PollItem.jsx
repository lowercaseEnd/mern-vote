import React from "react";
import { ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { interpolateInferno } from "d3-scale-chromatic";

import { interpolateColors } from "./utils/color-generator";

const color = () => {
  return (`#${Math.random().toString(16).slice(2, 8)}`);
}

function PollItem(props) {
  let history = useHistory();
  let colorRangeInfo = {
    colorStart: 0,
    colorEnd: 1,
    useEndAsStart: false
  }
  let colors = interpolateColors(props.poll.options.length, interpolateInferno, colorRangeInfo);
  function handleClick(id) {
    history.push(`/poll/${id}`);
  }
  const data = {
    labels: props.poll.options.map(option => option.option),
    datasets: [
      {
        label: props.poll.title, 
        backgroundColor: colors,
        data: props.poll.options.map(option => option.votes )
      }
    ]
  }
  return (
    <ListGroupItem className="h-50 w-75" action onClick={() => handleClick(props.poll._id)} >
      <h3 className="text-center text-capitalize text--teal">{props.poll.title}</h3>
      <Pie data={data} />
    </ListGroupItem>
  );
}

export default PollItem;