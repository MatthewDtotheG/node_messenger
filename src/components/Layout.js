import React, { Component } from "react";
import { connect } from "react-redux";
// import io from "socket.io-client";
import LoginForm from "./LoginForm";
import ChatContainer from "./chats/ChatContainer";
import "../index.css";

// const socketUrl = "http://192.168.1.7:5000/";
class Layout extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="container">
        {!user ? <LoginForm /> : <ChatContainer user={user} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStuff.userName
});

export default connect(
  mapStateToProps,
  null
)(Layout);
