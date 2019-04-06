import React, { Component } from "react";
import { connect } from "react-redux";
import { sendTypingAction, sendMessageAction } from "../../actions/userAction";

class MessageInput extends Component {
  state = {
    message: "",
    isTyping: false
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.chatId, this.state.message);
    this.props.sendMessageAction(this.props.chatId, this.state.message);
    this.setState({ message: "" });
  };

  // sendMessage = () => {
  //   this.props.sendMessageAction(this.props.chatId, this.state.message);
  // };

  componentWillMount = () => {
    this.stopCheckingTyping();
  };

  sendTypingMessage = () => {
    this.lastUpdateTime = Date.now();
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
      this.props.sendTypingAction(this.props.chatId, true);
      this.startCheckingTyping();
    }
  };

  startCheckingTyping = () => {
    console.log("Typing");
    this.typingInterval = setInterval(() => {
      if (Date.now() - this.lastUpdateTime > 300) {
        this.setState({ isTyping: false });
        this.stopCheckingTyping();
      }
    }, 300);
  };

  stopCheckingTyping = () => {
    console.log("stop typing");
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.props.sendTypingAction(this.props.chatId, false);
    }
  };

  render() {
    const { message } = this.state;
    return (
      <div className="message-input">
        <form onSubmit={this.handleSubmit} className="message-form">
          <input
            id="message"
            ref={"messageinput"}
            type="text"
            className="form-control"
            value={message}
            autoComplete={"off"}
            placeholder="Type something interesting"
            onKeyUp={e => {
              e.keyCode !== 13 && this.sendTypingMessage();
            }}
            onChange={({ target }) => {
              this.setState({ message: target.value });
            }}
          />
          <button disabled={message.length < 1} type="submit" className="send">
            Send
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatObj: state.userStuff.chatObj.id
});

const mapDispatchToProps = dispatch => ({
  sendTypingAction: (chatId, isTyping) =>
    dispatch(sendTypingAction(chatId, isTyping)),
  sendMessageAction: (chatId, message) =>
    dispatch(sendMessageAction(chatId, message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);
