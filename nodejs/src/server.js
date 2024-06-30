import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const {
  updateOrderStatus,
  updateTable,
} = require("./controllers/updateController");

var cron = require("node-cron");

require("dotenv").config(); // giup chayj dc dong process.env

let app = express();
// Đặt giới hạn kích thước yêu cầu là 50MB (đơn vị: bytes)
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors({ origin: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
let port = process.env.PORT || 8080; //Port === undefined => Port = 6060

// Create an HTTP server
let server = http.createServer(app);

// Create a Socket.IO server and attach it to the HTTP server
let io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

viewEngine(app);
initWebRoutes(app, io);

connectDB();

// 0 */5 * * * *  5 phút 1 lần

cron.schedule(" 0 59 23 * * *", async () => {
  console.log("Running a task update order status ...");
  await updateOrderStatus();
  console.log("Running a task update table ...");
  await updateTable();
});

// Use the HTTP server to listen for requests instead of the Express app
server.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
