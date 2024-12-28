const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require('dotenv').config();
// const http = require('http');
// const { Server } = require('socket.io');
const { app, server } = require('./ServerIO/Server.js')

app.use(cors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true,
}));

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         credentials: true
//     },
// });

const { connectdb } = require("./config/MongoDB")

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// Routes

const userRouter = require("./routes/user.router")
const messageRouter = require('./routes/message.route')
// const users = {};

// // realtime message code goes here
// console.log("reached here")
// // Helper function
// module.exports.getReceiverSocketId = async (recieveId) => {
//     console.log("Fetching receiver socket ID for:", recieveId);
//     return users[recieveId] || null;
// };


// // used to listen events on server side.
// io.on("connection", (socket) => {
//     console.log("a user connected", socket.id);
//     const userId = socket.handshake.query.userId;
//     if (userId) {
//         users[userId] = socket.id;
//         console.log("iyu", users[userId]);


//         console.log("Hello ", users);
//     }
//     // used to send the events to all connected users
//     io.emit("getOnlineUsers", Object.keys(users));

//     // used to listen client side events emitted by server side (server & client)
//     socket.on("disconnect", () => {
//         console.log("a user disconnected", socket.id);
//         delete users[userId];
//         io.emit("getOnlineUsers", Object.keys(users));
//     });
// });
// Mongo connection
connectdb(process.env.MONGO_URI);

app.use("/", userRouter)
app.use("/api/message", messageRouter)

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Socket.IO server is running on port 5000');
});