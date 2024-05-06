const express = require('express')
const app = express()

const http = require('http')
const {Server} = require('socket.io')

const cors = require('cors')
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {

    socket.on('join_room', (data) => {
        socket.join(data)
    })
    
    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data)
    })
})

// const PORT = 3001;
// const HOST = '192.168.0.106';
// server.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`));

const PORT = 3001;
server.listen(PORT, () => console.log(`Server is running on ${PORT}`));