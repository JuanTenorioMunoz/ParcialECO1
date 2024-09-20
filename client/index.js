let socket = io("http://localhost:5050", { path: "/real-time" });

const button = document.getElementById("login-button");
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

const assignRole = async () => {
}

const buttonClick = async () => {
  console.log("click");
  await saveUserName(); 
  await assignRole();
};

socket.on("userJoined", (data) => {
  console.log(data);
});

socket.on("displayRole", (RoleName) => {

  const vehContainer = document.getElementById("Role-container");
  if (!vehContainer) {
    const vehContainer = document.createElement("div");
    vehContainer.id = "Role-container";
    document.body.appendChild(vehContainer);
  }
  document.getElementById("Role-container").innerHTML += `<p>${RoleName}</p>`;
});

button.addEventListener("click", buttonClick);