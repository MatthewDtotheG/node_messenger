// const MESSAGE_PENDING = 'MESSAGE_PENDING'
// const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS';
// const MESSAGE_ERROR = 'MESSAGE_ERROR';
import { USER_CONNECTED, VERIFY_USER } from "../../src/Events"
import { socketHelper } from "../../src/socketHelper";

export const sendMessage = (userStuff) => dispatch => {    
  dispatch({
      type: 'MESSAGE_SUCCESS',
      userStuff
    });
  }

  export const userConnected = (user) => dispatch => {
    console.log('made it to user connected action')
    console.log(user)
    const socket = socketHelper();
    socket.emit(USER_CONNECTED, user)
  }

  export const verifyUser = (nickname, callback) => dispatch => {
    console.log('made it to verify user action')
    const socket = socketHelper();
    socket.emit(VERIFY_USER, nickname, callback);
  }