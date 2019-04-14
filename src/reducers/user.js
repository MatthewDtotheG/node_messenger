// USER STUFF WILL DO HERE

export default function(state = { messages: [] }, action) {
  switch (action.type) {
    case "MESSAGE_SUCCESS":
      return {
        ...state,
        ...state.messages.push(action.userStuff)
      };
    case "CONNECTED_USER":
      return {
        ...state,
        userName: action.user.name
      };
    case "LOGOUT":
      return {
        ...state,
        userName: null
      };
    case "ADD_CHAT_INFO":
      return {
        ...state,
        chatObj: action.communityChat
      };
    default:
      return state;
  }
}
