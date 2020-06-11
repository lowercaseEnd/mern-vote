import React from "react";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";


import PollItem from "./PollItem";

class UserPolls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPolls: []
    };
  }

  async componentDidMount() {
    if (this.props.username) {
      console.log("test");
      let res = await fetch(`http://localhost:4000/poll/${this.props.username}/polls`);
      let ans = await res.json();
      console.log(`User: ${JSON.stringify(ans)}`);
      this.setState({
        userPolls: ans.polls
      });
    }
  }
  render() {
    const polls = this.state.userPolls;
    if (polls === undefined) {
      return <h1>Polls not found</h1>
    } else {
      const pollList = polls.map((poll, index) => {
        console.log(poll, index);
        return <PollItem key={poll._id} poll={poll} />
      }
      );
      return (
        <ListGroup variant="flush">
          {pollList}
        </ListGroup>
      )
    }

  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
  }
}

export default connect(mapStateToProps)(UserPolls);