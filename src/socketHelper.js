import io from 'socket.io-client'

export function socketHelper() {
    console.log('made it to socketHelper')
    const socketURL = "http://10.65.189.156:5000/";
    const socket = io(socketURL);
    socket.on("connect", () => {
      console.log("Connected");
    });
    return socket;
}

export default { socketHelper }