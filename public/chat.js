const socket = io()

// get DOM elements
let message = document.getElementById("message")
let username = document.getElementById("username")
const sendButton = document.getElementById("send-button")
const output = document.getElementById("output")
const acitons = document.getElementById("acitons")
const connecitons = document.getElementById("connections")

sendButton.addEventListener("click", e => {
    e.preventDefault()
    if(message.value === "" || username === "") alert("Please provide a username or message")
    else {
        const userData = { username: username.value, message: message.value }
        socket.emit("chat:message", userData)
        message.value = ""
    }
})

message.addEventListener("keypress", () => {
    // send the username who is typing
    socket.emit("chat:typing", username.value)
})

socket.on("chat:message", (data) => {
    console.log(data)
    actions.innerHTML = ""
    output.innerHTML += 
        `<p id="me">
            <strong>${data.username}:</strong>
            ${data.message}
        </p>`
})

socket.on("chat:typing", (username) => {
    actions.innerHTML = 
        `
        <p id="others">
            <em>${username} is typing a message</em>
        </p>
        `
})
