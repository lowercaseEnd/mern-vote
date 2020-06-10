import React from "react";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";

class UserPolls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPolls: []
    };
  }

  async componentDidMount() {
    if (this.props.username) {
      let res = await fetch(`http://localhost:4000/poll/${this.props.username}/polls`);
      let ans = await res.json();
      console.log(ans);
      this.setState({
        userPolls: ans.polls
      });
    }
  }
  render() {
    const { polls } = this.state.userPolls;
    if (polls === undefined) {
      return <h1>Polls not found</h1>
    } else {
      const display = polls.map(poll => (<p>{poll.title}</p>))
      return (
        <ListGroup>
          <ListGroup.Item>{display}</ListGroup.Item>
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