import React, { Component } from "react";
import { connect } from "react-redux";
// import io from "socket.io-client";
import LoginForm from "./LoginForm";
import ChatContainer from "./chats/ChatContainer";
import { LOGOUT } from "../Events";
import "../index.css";

// const socketUrl = "http://192.168.1.7:5000/";
class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null
    };
  }

  componentDidMount() {
    //socketHelper();
    //  this.initSocket();
  }

  componentDidUpdate() {
    console.log(this.props.user);
  }
  //
  // initSocket = () => {
  //   const socket = io(socketUrl);
  //   socket.on("connect", () => {
  //     console.log("Connected");
  //   });
  //   this.setState({
  //     socket
  //   });
  // };

  // setUser = user => {
  //   const { socket } = this.state;
  //   this.setState({ user: user }, () =>
  //     socket.emit(USER_CONNECTED, this.state.user)
  //   );
  // };

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    const { title, user } = this.props;
    const { socket } = this.state;
    return (
      <div className="container">
        {!user ? (
          <LoginForm socket={socket} />
        ) : (
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        )}
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
