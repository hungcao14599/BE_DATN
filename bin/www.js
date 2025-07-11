#!/usr/bin/env node

/**
 * Module dependencies.
 */


import path from "path";
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

var app = require("../app");
var debug = require("debug")("be:server");
var http = require("http");
var socketio = require("socket.io");
var messageService = require("../services/message.service");
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT);
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);


const io = socketio(server, {
  cors: {
    origin: "http://localhost:3006",
  },
});

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    socket.join(room);
    callback();
  });

  socket.on("sendMessage", async ({ name, message, room }, callback) => {
    const response = await messageService.createMessage({
      username: name,
      message,
      chatID: room,
    });
    io.to(room).emit("message", response);
    callback();
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

// server.listen(port);
server.listen(port, '0.0.0.0'); // 👈 Sửa tại đây!
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
