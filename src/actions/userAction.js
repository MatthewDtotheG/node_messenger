// const MESSAGE_PENDING = 'MESSAGE_PENDING'
// const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS';
// const MESSAGE_ERROR = 'MESSAGE_ERROR';
import {
  USER_CONNECTED,
  VERIFY_USER,
  LOGOUT,
  COMMUNITY_CHAT,
  TYPING,
  MESSAGE_SENT
} from "../../src/Events";
import io from "socket.io-client";

const socketUrl = "http://10.164.181.225:5000/";
const socket = io(socketUrl);

export const sendMessage = userStuff => dispatch => {
  dispatch({
    type: "MESSAGE_SUCCESS",
    userStuff
  });
};

export const logoutUser = () => dispatch => {
  socket.emit(
    LOGOUT,
    dispatch({
      type: "LOGOUT"
    })
  );
  console.log("Made it to logout user Action");
};

export const userConnected = user => dispatch => {
  console.log("made it to user connected action");
  console.log(user);
  socket.emit(
    USER_CONNECTED,
    user,
    dispatch({
      type: "CONNECTED_USER",
      user
    })
  );
};

export const verifyUser = (nickname, callback) => dispatch => {
  console.log("made it to verify user action");
  socket.emit(VERIFY_USER, nickname, callback);
};

export const communityChat = callback => dispatch => {
  console.log("made it to Community Chat action");
  socket.emit(COMMUNITY_CHAT, communityChat => {
    callback(communityChat);
    dispatch({
      type: "ADD_CHAT_INFO",
      communityChat
    });
  });
};

export const sendTypingAction = (chatId, isTyping) => dispatch => {
  console.log(chatId);
  console.log(isTyping);
  socket.emit(TYPING, { chatId, isTyping });
};

export const sendMessageAction = (chatId, message) => dispatch => {
  console.log("made it to message action");
  socket.emit(MESSAGE_SENT, { chatId, message });
};

/// THESE ARE IN ADD CHAT
export const messageAction = (messageEvent, callback) => dispatch => {
  console.log("MESSAGE EVENT");
  socket.on(messageEvent, callback);
};
export const typingAction = (typingEvent, callback) => dispatch => {
  console.log("TYPING EVENT");
  socket.on(typingEvent, callback);
};
