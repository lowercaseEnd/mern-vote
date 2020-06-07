import React from "react";
import {} from "react-bootstrap";
import { connect } from "react-redux";

class Polls extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul>
        {this.props.posts.map(post => {
          return (<li key={post._id}>
            {post._id}
          </li>)
        })}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Polls);
