const path = require("path")
const express = require("express")
const app = express()

// settings
app.set("port", process.env.PORT || 5000)

// static files
app.use(express.static(path.join(__dirname, "public")))

// start the server
const server = app.listen(app.get("port"), () => {
    console.log("server running on port ", app.get("port"))
})


// websockets
const SocketIO = require("socket.io")
const io = SocketIO(server)

io.on("connection", (socket) => {
    console.log("new connection with the ID: ", socket.id)

    // socket gets a new message
    socket.on("chat:message", (data) => {
        // recieve user data
        console.log(data)
        io.sockets.emit("chat:message", data)
    })

    // socket recieves a user who is typing
    socket.on("chat:typing", (username) => {
        // send username who is typing to all users but me
        socket.broadcast.emit("chat:typing", username)
    })

    socket.on("disconnect", () => {
        console.log("disconnected: ", socket.id)
    })
})

