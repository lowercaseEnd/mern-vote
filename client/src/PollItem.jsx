import React from "react";
import { ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function PollItem(props) {
  let history = useHistory();

  function handleClick(id) {
    history.push(`/poll/${id}`);
  }

  return (
    <ListGroupItem action onClick={() => handleClick(props.poll._id)} >
      {props.poll.title}
    </ListGroupItem>
  );
}

export default PollItem;