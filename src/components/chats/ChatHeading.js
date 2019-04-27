import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userAction";

class ChatHeading extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="chat-header">
        <div className="user-info">
          <div className="user-name">{`Hi, ${user}`}</div>
        </div>
        <p onClick={() => this.props.logoutUser()}>Logout</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  null,
  mapDispatchToProps
)(ChatHeading);
