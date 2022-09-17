const express = require("express");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const cors = require("cors");
const helmet = require("helmet");
const socketio = require("socket.io");
const http = require("http");

const { PORT } = require("./env");

const usersRoute = require("./src/route/users.route");
const authRoute = require("./src/route/auth.route");
const postRoute = require("./src/route/post.route");
const consultantRoute = require("./src/route/consultant.route");
const likeRoute = require("./src/route/like.route");
const commentRoute = require("./src/route/comment.route");
const bookingRoute = require("./src/route/booking.route");

const socketController = require("./src/socket/index");

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*"
  }
});

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  })
);

app.use("/public", express.static("public"));

app.use(
  cors({
    origin: "*"
  })
);

app.use(bodyParser.json());
app.use(xss());

app.use(authRoute);
app.use(usersRoute);
app.use(postRoute);
app.use(consultantRoute);
app.use(likeRoute);
app.use(commentRoute);
app.use(bookingRoute);

io.on("connection", (socket) => {
  socketController(io, socket);
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "API Not Found, Please make sure you are using the correct URL"
  });
});

server.listen(PORT, () => console.log(`service running on PORT ${PORT}`));
