const typingWithoutEffect = (phrase) => {
  const commandExit = document.createElement("p");
  commandExit.innerHTML = phrase;
  document.querySelector(".terminal").appendChild(commandExit);
};

const clearCommandPrompt = () => {
  const commandPrompt = document.querySelector(".terminal");
  const lines = commandPrompt.querySelectorAll("p");
  lines.forEach((line) => line.remove());
};

const defineUser = async (username) => {
  document.title = `${username}@89.152.186.173: ~`


  localStorage.setItem("username", JSON.stringify({
    username,
    color: `#${Math.floor(Math.random()*16777215).toString(16)}`
  }));
  
  await typingWithoutEffect(`→ <span style="color: #5788ff;"> Connected! </span>`);
}

const typingMessages = (user, message) => {
  const commandExit = document.createElement("p");
  commandExit.innerHTML = `<span style="color: ${user.color};"> ${user.username}: </span> ${message}`;
  document.querySelector(".terminal").appendChild(commandExit);
}

if (performance.navigation.type === 1) {
  localStorage.removeItem("username")
}