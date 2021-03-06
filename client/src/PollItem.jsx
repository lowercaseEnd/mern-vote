import React from "react";
import { ListGroupItem, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { interpolateInferno } from "d3-scale-chromatic";

import { interpolateColors } from "./utils/color-generator";

function PollItem(props) {
  let history = useHistory();
  let colorRangeInfo = {
    colorStart: 0.2,
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
  };
  return (
    <ListGroupItem className="h-50" action onClick={() => handleClick(props.poll._id)} >
      <h2 className="text-center text-capitalize text--teal">{props.poll.title}</h2>
      <Pie data={data} height={150} width={200} className="align-center" />
    </ListGroupItem>
  );
}

export default PollItem;