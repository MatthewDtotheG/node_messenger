import React, { Component } from "react";

class Messages extends Component {
  constructor(props) {
    super(props);

    this.scrollDown = this.scrollDown.bind(this);
  }

  scrollDown = () => {
    const { container } = this.refs;
    container.scrollTop = container.scrollHeight;
  };

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollDown();
  }

  render() {
    const { messages, user, typingUsers } = this.props;
    console.log(messages);
    console.log(user);
    console.log(typingUsers);
    return (
      <div ref="container" className="thread-container">
        <div className="thread">
          {messages.map(mes => {
            return (
              <div
                key={mes.id}
                className={`message-container ${mes.sender === user &&
                  "right"}`}
              >
                <div className="time">{mes.time}</div>
                <div className="date">
                  <div className="message">{mes.message}</div>
                  <div className="name">{`${mes.name}`}</div>
                </div>
              </div>
            );
          })}
          {typingUsers.map(name => {
            return (
              <div key={user} className="typing-user">
                {`${user} is ...typing`}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Messages;
