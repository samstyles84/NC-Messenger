const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

const users = {};
io.on("connection", (socket) => {
  socket.on("join", (name) => {
    console.log(name);
    const user = { name, id: socket.id };
    users[socket.id] = user;
    console.log(users);
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });
  socket.on("send", ({ name, message }) => {
    io.emit("message", { name, message });
  });
  socket.on("disconnect", () => {
    const name = users[socket.id];
    delete users[socket.id];
    io.emit("disconnected", socket.id);
  });
});

http.listen(9000, function () {
  console.log("listening on port 9000");
});
