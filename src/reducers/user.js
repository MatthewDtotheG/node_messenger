// USER STUFF WILL DO HERE

export default function (state = {messages: []}, action) {

  switch (action.type) {
    case 'MESSAGE_SUCCESS':
      return {
        ...state,
        ...state.messages.push(action.userStuff)
      }
    default:
      return state;
  }
}