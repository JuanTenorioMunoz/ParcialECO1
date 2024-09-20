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
  rolesAvailable: {
    marco: 1,
    polo: 1,
  },
};

io.on("connection", (socket) => {

  socket.on("addUserName", (user) => {

    const userFound = db.users.find((usher) => usher.userName === user)

    if(!userFound){
      db.users.push({ userName: user });
      console.log(user);
      io.emit("userJoined", db);}
  
  });

  socket.on("assignRole", (user) => {
    const usher = db.users.find((usher) => usher.userName === user);
  
      if (!usher.role) {
        const { marco, polo } = db.rolesAvailable;
  
        if (marco > 0) {
          usher.role = "Marco!";
          db.rolesAvailable.marco -= 1;
          io.emit("displayRole", usher.userName, usher.role);

        } else if (polo > 0) {
          usher.role = "Polo premium!";
          db.rolesAvailable.polo -= 1;
          io.emit("displayRole", usher.userName, usher.role);
  
        } else {
          usher.role = "Polo!";
          io.emit("displayRole", usher.userName, usher.role);
        }
      } 
    
  });
  
  
  socket.on("notifyMarco", () => {
    const marcoUsers = db.users.filter((usher) => usher.role === "Marco!");
    io.emit("marcoResponse", marcoUsers.map(usher => usher.userName));
  });

  socket.on("notifyPolo", () => {
    const poloUsers = db.users.filter((usher) => usher.role === "Polo!");
    io.emit("poloResponse", poloUsers.map(usher => usher.userName));
  });

  socket.on("onSelectPolo", (user) => {
    const usher = db.users.find((usher) => usher.userName === user);
    if (usher) {
      usher.role = "Polo!";
      io.emit("displayRole", usher.userName, usher.role);
    } else {
      console.log("user not found");
    }
  });

});

// Routes to interact with the db

// Get the current data from db

httpServer.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`);
});