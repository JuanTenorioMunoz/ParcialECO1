let socket = io("http://localhost:5050", { path: "/real-time" });

const button = document.getElementById("login-button");
const buttonStart = document.getElementById("start-game")
const input = document.getElementById("input");

console.log("FUNNNNY")

const saveUserName = async () => {
  const userName = input.value;
  
  try {
    socket.emit("addUserName", userName);
    socket.emit("assignRole", userName)
    localStorage.setItem('username', userName);
  } catch (error) {
    console.log(error);
  }
};

const buttonClick = async () => {
  console.log("click");
  await saveUserName(); 
};

const buttonStartClick = async () => {
  const userName = localStorage.getItem('username');
  if (userName) {
    socket.emit("startGame", userName);
  } else {
    console.log("User not logged in.");
  }
};

socket.on("userJoined", (data) => {
  console.log(data);
});

socket.on("startGame", (userName, role) => {
  const yesGameDiv = document.getElementsByClassName("yesGame")[0];
  const noGameDiv = document.getElementsByClassName("noGame")[0];

  if (yesGameDiv && noGameDiv) {
    yesGameDiv.style.display = "block";
    noGameDiv.style.display = "none";
  }

  let vehContainer = document.getElementsByClassName("Role-container")[0];
  if (!vehContainer) {
    vehContainer = document.createElement("div");
    vehContainer.className = "Role-container";
    vehContainer.id = role;
    document.body.appendChild(vehContainer);
  }
  
  vehContainer.innerHTML += `<p>${userName}</p>`;
  vehContainer.innerHTML += `<p>${role}</p>`;
});


button.addEventListener("click", buttonClick);
buttonStart.addEventListener("click", buttonStartClick)