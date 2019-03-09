import React, { Component } from "react";
import io from "socket.io-client";
import LoginForm from "./LoginForm";
import ChatContainer from "./chats/ChatContainer";
import { LOGOUT } from "../Events";
import { socketHelper } from '../../src/socketHelper';
import "../index.css";

const socketUrl = "http://10.164.181.225:5000/";
class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null
    };
  }

  componentDidMount() {
    socketHelper();
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on("connect", () => {
      console.log("Connected");
    });
    this.setState({
      socket
    });
  };

  // setUser = user => {
  //   const { socket } = this.state;
  //   this.setState({ user: user }, () =>
  //   socket.emit(USER_CONNECTED, this.state.user)
  //   );
  // };

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    // const { title } = this.props;
    const { socket, user } = this.state;
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

export default Layout
