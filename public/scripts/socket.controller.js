const input = document.querySelector("input");
const socketConnection = io('http://89.152.186.173/:3000');

const commands = {
  "/user": (username) => defineUser(username),
  "/help": async () => {
    await typingWithoutEffect(
      "→ Commands: " +
        JSON.stringify(Object.keys(commands)).replace(/["']/g, "")
    );
  },
};

document.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13 && input.value) {
    const args = input.value.toLocaleLowerCase().split(" ");

    if (args[0].charAt(0) === "/")
      if (args[0] in commands)
        commands[args[0]](args[1]);
      else
        await typingWithoutEffect(`→ Command not found: ${input.value}. Type help for a list of supported commands` );
    else
      if (localStorage.getItem("username")) sendMessageToGlobalChat(input.value);
      else await typingWithoutEffect(`→ Type <span>/user <-name-> </span> to create the temporary user.` );

    input.value = "";
  }
    
});

const sendMessageToGlobalChat = (message) => {
  const user = JSON.parse(localStorage.getItem("username"));
  socketConnection.emit("global_message", {
    user,
    message
  })
}

socketConnection.on("emit_global_message", async (data) => {
  await typingMessages(data.user, data.message)
})
