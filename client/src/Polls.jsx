import React from "react";
import {} from "react-bootstrap";

class Polls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: []
    };
  }
  async componentDidMount() {
    let res = await fetch("http:/localhost:4000/poll/polls", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    let ans = await res.json();
    this.setState({
      polls: ans
    });
  }
  render() {
    const temp = this.state.polls.map(poll => (
    <li>{poll}</li>
    ))
    return (
      <ul>
      {temp}
      </ul>
    );
  }
}

export default Polls;