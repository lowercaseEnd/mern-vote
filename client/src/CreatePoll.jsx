import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";


class CreatePollForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      shortName: "",
      options: ["", ""],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addOption = this.addOption.bind(this);
    this.handleOption = this.handleOption.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  addOption() {
    this.setState({
      options: [...this.state.options, ""]
    });
  }
  handleOption(event, index) {
    const options = [...this.state.options];
    options[index] = event.target.value;
    this.setState({
      options
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { title, shortName, options } = this.state;
    const data = { title, shortName, options };
    let first = await fetch("http://localhost:4000/poll/create_poll", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      cache: "default",
      credentials: "include",
      body: JSON.stringify(data)
    });
    let ans = await first.json();
    console.log(ans);
    if (ans.success) {
      fetch(`http://localhost:4000/poll/polls`)
      .then(response => response.json())
      .then(res => this.props.dispatch({
        type: "LOAD_POLLS",
        payload: res
      }));
    }
  }
  render() {
    const options = this.state.options.map((option, index) => (
      <React.Fragment key={index}>
        <Form.Label>Option {index + 1}</Form.Label>
        <Form.Control name="options" type="text" value={option} onChange={event => this.handleOption(event, index)} />
      </React.Fragment>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} />
        <Form.Label htmlFor="shortName">Short Name</Form.Label>
        <Form.Control type="text" id="shortName" name="shortName" value={this.state.shortName} onChange={this.handleChange} />
        {options}
        <Button type="button" onClick={this.addOption}>Add option</Button>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const mapActionToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(null, mapActionToProps)(CreatePollForm);