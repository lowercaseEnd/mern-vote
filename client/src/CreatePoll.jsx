import React from "react";

class CreatePollForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      shortName: "",
      options: ["", ""],
    }
    this.onSubmit = this.onSubmit.bind(this);
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
  onSubmit(event) { }
  render() {
    const options = this.state.options.map((option, index) => (
      <React.Fragment key={index}>
        <label>Option {index + 1}</label>
        <input type="text" value={option} onChange={event => this.handleOption(event, index)} />
      </React.Fragment>
    ));
    return (
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} />
        {options}
        <button type="button" onClick={this.addOption}>Add option</button>
      </form>
    );
  }
}

export default CreatePollForm;