app = require("./app");
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

const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
