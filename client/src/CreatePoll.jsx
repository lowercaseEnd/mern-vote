import React from "react";
import { Form, Button } from "react-bootstrap";

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
  handleSubmit(event) { }
  render() {
    const options = this.state.options.map((option, index) => (
      <React.Fragment key={index}>
        <Form.Label>Option {index + 1}</Form.Label>
        <Form.Control type="text" value={option} onChange={event => this.handleOption(event, index)} />
      </React.Fragment>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} />
        {options}
        <Button type="button" onClick={this.addOption}>Add option</Button>
      </Form>
    );
  }
}

export default CreatePollForm;