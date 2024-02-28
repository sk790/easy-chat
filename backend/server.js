import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectToMongo from "./db/db.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import getFriendRequests  from "./routes/getFriendReq.routes.js"

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use('/api', getFriendRequests);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// listen
server.listen(PORT, () => {
  connectToMongo();
  console.log(`listening on port ${PORT}`);
});
