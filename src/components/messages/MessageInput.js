import React, { Component } from "react";

class MessageInput extends Component {

  state = {
    message: "",
    isTyping: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.sendMessage()
    this.setState({message:""})
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.message)
  }

  componentWillMount = () => {
    this.stopCheckingTyping()
  }

  sendTypingMessage = () => {
    this.lastUpdateTime = Date.now()
    if(!this.state.isTyping){
      this.setState({isTyping: true})
      this.props.sendTyping(true)
      this.startCheckingTyping()
    }
  }

  startCheckingTyping = () => {
    console.log("Typing");
    this.typingInterval = setInterval(() => {
      if((Date.now() - this.lastUpdateTime) > 300) {
          this.setState({isTyping:false})
          this.stopCheckingTyping()
      }
    }, 300)
  }

  stopCheckingTyping = () => {
    console.log("stop typing");
    if(this.typingInterval){
      clearInterval(this.typingInterval)
      this.props.sendTyping(false)
    }
  }

  render() {
    const { message } = this.state
    return (
      <div className="message-input">
        <form onSubmit={this.handleSubmit} className="message-form">
          <input
            id="message"
            ref={"messageinput"}
            type="text"
            className="form-control"
            value = { message }
            autoComplete = {'off'}
            placeholder = "Type something interesting"
            onKeyUp = { e => { e.keyCode !== 13 && this.sendTypingMessage() } }
            onChange = {
              ({target}) => {
                this.setState({message: target.value})
              }
            }
            />
          <button
            disabled = { message.length < 1 }
            type = "submit"
            className = "send"
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default MessageInput;
