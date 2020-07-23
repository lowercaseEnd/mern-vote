import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { loadPolls } from "./store/actions/index";
import { createPoll, getPolls } from "./api/fetch";

function CreatePollForm(props) {
  let [title, setTitle] = useState("");
  let [shortName, setShortName] = useState("");
  let [options, setOptions] = useState(["", ""]);

  function handleOption(event, index) {
    const optionsTemp = [...options];
    optionsTemp[index] = event.target.value;
    setOptions(optionsTemp);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { title, shortName, options };
    let ans = await createPoll(data);
    if (ans.success) {
      let polls = await getPolls();
      props.dispatch(loadPolls(polls));
      setTitle("");
      setShortName("");
      setOptions(["", ""]);
    }
  }
  const optionsTag = options.map((option, index) => (
    <React.Fragment key={index}>
      <Form.Label htmlFor={"option-" + index}>Option {index + 1}</Form.Label>
      <Form.Control id={"option-" + index} name="options" type="text" value={option} onChange={event => handleOption(event, index)} />
    </React.Fragment>
  ));
  return (
    <>
      {!props.loggedIn && <p className="inline text-center alert alert-warning">Only logged in users may create polls</p>}

      <div className="create shadow">
        <Form className="create__form" onSubmit={handleSubmit}>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control type="text" id="title" name="title" value={title} onChange={event => setTitle(event.target.value)} />
          <Form.Text id="title" muted>Must be at least 3 characters long.</Form.Text>
          <Form.Label htmlFor="shortName">Short Name</Form.Label>
          <Form.Control type="text" id="shortName" name="shortName" value={shortName} onChange={event => setShortName(event.target.value)} />
          <Form.Text id="title" muted>Must be not longer than 16 characters long.</Form.Text>
          {optionsTag}
          <p className="alert text-info">All options must be unique</p>
          <Button type="button" onClick={() => setOptions([...options, ""])}>Add option</Button>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}
const mapActionToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapActionToProps)(CreatePollForm);