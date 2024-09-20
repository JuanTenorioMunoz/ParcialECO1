let socket = io("http://localhost:5050", { path: "/real-time" });

document.getElementById("join-button").addEventListener("click", fetchData);

async function fetchData() {
  socket.emit("joinGame", { nickname: "Spiderman xd" }); // Sends a string message to the server
}

socket.on("userJoined", (data) => {
  console.log(data);
});
