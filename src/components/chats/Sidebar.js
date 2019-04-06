import React, { Component } from "react";
import { connect } from "react-redux";
import { FaEject } from "react-icons/fa";
import { logoutUser } from "../../actions/userAction";

class Sidebar extends Component {
  render() {
    const { chats, activeChat, user, setActiveChat, userName } = this.props;
    return (
      <div id="side-bar">
        <div className="heading">
          <div className="app-name">Chat App</div>
        </div>
        <div
          className="users"
          ref="users"
          onClick={e => {
            e.target === this.refs.user && setActiveChat(null);
          }}
        >
          {chats.map(chat => {
            if (chat.name) {
              const lastMessage = chat.messages[chat.messages.length - 1];
              const user = chat.users.find(({ name }) => {
                return name !== this.props.name;
              }) || { name: "Community" };
              const classNames =
                activeChat && activeChat.id === chat.id ? "active" : "";

              return (
                <div
                  key={chat.id}
                  className={`user ${classNames}`}
                  onClick={() => {
                    setActiveChat(chat);
                  }}
                >
                  <div className="user-photo">{user.name[0].toUpperCase()}</div>
                  <div className="user-info">
                    <div className="name">{userName}</div>
                    {lastMessage && (
                      <div className="last-message">{lastMessage.message}</div>
                    )}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
        <div className="current-user">
          <span>{user.name}</span>
          <div
            onClick={() => this.props.logoutUser()}
            title="Logout"
            className="logout"
          >
            <FaEject />
          </div>
        </div>
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
)(Sidebar);
