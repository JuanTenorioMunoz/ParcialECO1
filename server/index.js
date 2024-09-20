const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: "/real-time",
  cors: {
    origin: "*",
  },
});

const db = {
  users: [],
};

io.on("connection", (socket) => {

  socket.on("addUserName", (user) => {
    db.users.push({ userName: user });
    console.log(user);
    io.emit("userJoined", db);
  });

  socket.on("assignRole", (user) => {
    const usher = db.users.find((usher) => usher.userName === user);

      if (!usher.role) {
        const marco = "Marco!"
        const polo = "Polo!"
        const poloPremium = "Polo premium!"
      
        usher.role = marco;
      
      io.emit("displayRole", usher.userName, usher.role);

    } else {
      console.log("user not found");
    }
  });
  

  // implement "notifyMarco" listener

  // implement "notifyPolo" listener

  // implement "onSelectPolo" listener
});

// Routes to interact with the db

// Get the current data from db

httpServer.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`);
});