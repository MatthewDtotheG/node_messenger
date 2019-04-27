import React, { Component } from "react";
import { userConnected, verifyUser } from "../actions/userAction";
import { connect } from "react-redux";
class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      error: ""
    };
  }

  verifyUser = ({ user, isUser }) => {
    if (isUser) {
      this.setError("Username taken");
    } else {
      this.setError("");
      // this.props.setUser(user);
      this.props.userConnected(user);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    // const { socket } = this.props;
    const { nickname } = this.state;
    this.props.verifyUser(nickname, this.verifyUser);
    //socket.emit(VERIFY_USER, nickname, this.verifyUser);
  };

  handleChange = e => {
    this.setState({
      nickname: e.target.value
    });
  };

  setError = error => {
    this.setState({
      error
    });
  };

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h2>Enter username</h2>
          </label>
          <input
            ref={input => {
              this.textInput = input;
            }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder={"username"}
          />
          <button type="submit">Login</button>
          <div className="error">{error ? error : null}</div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userConnected: user => dispatch(userConnected(user)),
  verifyUser: (nickname, callback) => dispatch(verifyUser(nickname, callback))
});

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
