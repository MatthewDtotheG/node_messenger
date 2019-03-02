const app = require("http").createServer();
const io = (module.exports.io = require("socket.io")(app, { origins: "*:*" }));

const PORT = process.env.PORT || 5000;

const SocketManager = require("./SocketManager");

io.set("origins", "*:*");

io.on("connection", SocketManager);

app.listen(PORT, () => {
  console.log(`Connected to port: ${PORT}`);
});
