import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";

import Popup from "./Popup";
import PollItem from "./PollItem";


function deleteAllCookies() {
  let cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

class UserPolls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPolls: [],
      showPopup: false
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  async handleDelete() {
    this.setState({
      showPopup: !this.state.showPopup
    });
    let data = {
      username: this.props.username
    }
    let ans = await fetch(`http://localhost:4000/auth/user/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
        credentials: "include",
        body: JSON.stringify(data)
      });
    let res = await ans.json();
    if (res.success) {
      this.props.dispatch({
        type: "SET_CURRENT_USER",
        payload: {
          username: ""
        }
      });
      localStorage.clear();
      deleteAllCookies();
    }
  }
  render() {
    const polls = this.state.userPolls;
    if (this.props.username === "") {
      return <h1>User not found</h1>;
    }
    if (polls === undefined) {
      return <h1>Polls not found</h1>
    } else if (polls.length === 0) {
      return (
        <>
          <p>Profile: {this.props.username}</p>
          <h1>Poll</h1>
          <Button onClick={this.togglePopup}>Delete profile</Button>
          {this.state.showPopup && <Popup close={this.togglePopup.bind(this)} delete={this.handleDelete.bind(this)} />}
        </>
      );
    } else {
      const pollList = polls.map((poll, index) => {
        console.log(poll, index);
        return <PollItem key={poll._id} poll={poll} />
      }
      );
      return (
        <div>
          <p>Profile: {this.props.username}</p>
          <ListGroup variant="flush">
            {pollList}
          </ListGroup>
          <Button onClick={this.handleDelete}>Delete profile</Button>
          {this.state.showPopup && <Popup close={this.togglePopup.bind(this)} delete={this.handleDelete.bind(this)} />}
        </div>
      )
    }

  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPolls);