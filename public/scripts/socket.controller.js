const socket = io();
const input = document.querySelector("input");

document.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13 && input.value) {
    const args = input.value.toLocaleLowerCase().split(" ");

    if (args[0].charAt(0) === "/")
        if (args[0] in commands && args.length === 2) 
            commands[args[0]](args[1])
        else 
            typing(`→ Command not found: ${input.value}. Type help for a list of supported commands`);
    else
        if (localStorage.getItem("user"))
            sendMessageToGlobal(input.value);
        else
            typing("→ Type <span>/user <-name-> </span> to create the temporary user.")

    input.value = "";
  }
});

const sendMessageToGlobal = (message) => {
    const user = JSON.parse(localStorage.getItem("user"));
    socket.emit("global_chat", {
        user,
        message
    });
}

socket.on("global_chat", (data) => {
    typing(data.message, data.user)
})

socket.on("user_connected", (data) => {
    typingUserConnected(data);
})