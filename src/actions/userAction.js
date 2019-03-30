// const MESSAGE_PENDING = 'MESSAGE_PENDING'
// const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS';
// const MESSAGE_ERROR = 'MESSAGE_ERROR';
import { USER_CONNECTED, VERIFY_USER } from "../../src/Events";
import io from "socket.io-client";

const socketUrl = "http://10.164.181.225:5000/";
const socket = io(socketUrl);

export const sendMessage = userStuff => dispatch => {
  dispatch({
    type: "MESSAGE_SUCCESS",
    userStuff
  });
};

export const userConnected = user => dispatch => {
  console.log("made it to user connected action");
  socket.emit(USER_CONNECTED, user);
  dispatch({
    type: "CONNECTED_USER",
    user
  });
};

export const verifyUser = (nickname, callback) => dispatch => {
  console.log("made it to verify user action");
  socket.emit(VERIFY_USER, nickname, callback);
};
