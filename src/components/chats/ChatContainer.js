import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import ChatHeading from "./ChatHeading";
import Messages from "../messages/Messages";
import MessageInput from "../messages/MessageInput";
import { MESSAGE_RECIEVED, TYPING } from "../../Events";
import {
  communityChat,
  typingAction,
  messageAction
} from "../../actions/userAction";

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      activeChat: null
    };
  }

  componentDidMount() {
    // socket.emit(COMMUNITY_CHAT, this.resetChat);
    this.props.communityChat(this.resetChat);
  }

  // Reset the chat back to only the chat passed in
  // @param chat {chat}
  resetChat = chat => {
    return this.addChat(chat, true);
  };

  // Adds chat to the chat container, if reset is true removes all chats
  // and sets the chat to the main chat
  // Sets the message and typing socket events for the chat.

  // @param chat {chat} the chat to be added
  // @param reset {boolean} if true will set the chat as the only chat

  addChat = (chat, reset) => {
    const { chats } = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({
      chats: newChats,
      activeChat: reset ? chat : this.state.activeChat
    });

    const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`;
    const typingEvent = `${TYPING}-${chat.id}`;

    //actions here
    this.props.typingAction(typingEvent, this.updateTypingInChat(chat.id));
    this.props.messageAction(messageEvent, this.addMessageToChat(chat.id));
    // socket.on(typingEvent, this.updateTypingInChat(chat.id));
    // socket.on(messageEvent, this.addMessageToChat(chat.id));
  };

  // Returns a function that will
  // adds message to chat with the chatId passed in

  // @param chatId {number}

  addMessageToChat = chatId => {
    return message => {
      const { chats } = this.state;
      let newChats = chats.map(chat => {
        if (chat.id === chatId) chat.messages.push(message);
        return chat;
      });
      this.setState({ chats: newChats });
    };
  };

  // Updates the typing of chat with id passed in
  // @param chatId {number}

  updateTypingInChat = chatId => {
    return ({ isTyping, user }) => {
      if (user !== this.props.user.name) {
        const { chats } = this.state;
        let newChats = chats.map(chat => {
          if (chat.id === chatId) {
            if (isTyping && !chat.typingUsers.includes(user)) {
              chat.typingUsers.push(user);
            } else if (!isTyping && chat.typingUsers.includes(user)) {
              chat.typingUsers = chat.typingUsers.filter(u => u !== user);
            }
          }
          return chat;
        });
        this.setState({ chats: newChats });
      }
    };
  };

  setActiveChat = activeChat => {
    this.setState({ activeChat });
  };

  render() {
    const { userName, chatObj } = this.props;
    const { chats } = this.state;
    return (
      <div className="container">
        <Sidebar
          chats={chats}
          user={userName}
          activeChat={chatObj}
          setActiveChat={this.setActiveChat}
        />
        <div className="chat-room-container">
          {chatObj !== undefined ? (
            <div className="chat-room">
              <ChatHeading name={chatObj.name} />
              <Messages
                messages={chatObj.messages}
                user={userName}
                typingUsers={chatObj.typingUsers}
              />
              <MessageInput chatId={chatObj.id} />
            </div>
          ) : (
            <div className="chat-room choose">
              <h3>Choose a chat!</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatObj: state.userStuff.chatObj,
  userName: state.userStuff.userName
});

const mapDispatchToProps = dispatch => ({
  communityChat: resetChat => dispatch(communityChat(resetChat)),
  typingAction: (typingEvent, callback) =>
    dispatch(typingAction(typingEvent, callback)),
  messageAction: (messageEvent, callback) =>
    dispatch(messageAction(messageEvent, callback))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer);
