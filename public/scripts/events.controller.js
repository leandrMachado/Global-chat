const commands = {
  "/user": (username) => create_user(username),
};

const create_user = async (username) => {
  document.title = `${username}@89.152.186.173: ~`;
  const user = {
    username,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  };

  localStorage.setItem("user", JSON.stringify(user));
  clearCommandPrompt();
  await typing(`→ <span style="color: #5788ff;"> ${username} connected. </span>`);
};

const clearCommandPrompt = () => {
  const commandPrompt = document.querySelector(".terminal");
  const lines = commandPrompt.querySelectorAll("p");
  lines.forEach((line) => line.remove());
};

const typing = (message, user = {}) => {
  const commandExit = document.createElement("p");

  if (Object.keys(user).length === 0) commandExit.innerHTML = message;
  else
    commandExit.innerHTML = `<span style="color: ${user.color};"> ${user.username}: </span> ${message}`;

  document.querySelector(".terminal").appendChild(commandExit);
};

if (performance.navigation.type === 1) localStorage.removeItem("user");
