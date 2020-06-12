import React from "react";
import { Button } from "react-bootstrap";

function Popup(props) {
  return (
    <div className='popup'>
      <div className='popup--inner'>
        <h1>Delete the poll?</h1>
        <Button onClick={props.delete}>Delete</Button>
        <Button onClick={props.close}>Close</Button>
      </div>
    </div>
  );
}

export default Popup;