import React from "react";
import { ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function PollItem(props) {
  let history = useHistory();

  function handleClick(id) {
    history.push(`/poll/${id}`);
  }

  return (
    <ListGroupItem active onClick={() => handleClick(props.poll._id)}>
      {props.poll._id}
    </ListGroupItem>
  );
}

export default PollItem;