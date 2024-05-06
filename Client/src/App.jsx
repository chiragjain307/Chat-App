import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'

const socket = io.connect('http://192.168.0.106:3001')

// for vercel deployment
// const socket = io.connect('https://chat-app-server-ivory-omega.vercel.app:3001')

function App() {
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')
  const [receivedMessage, setReceivedMessage] = useState('')
   
  const handleRoom = () => {
    if(room === '') return
    else socket.emit('join_room', room)
  }

  const handleButton = () => {
    socket.emit('send_message', {message, room})
    setMessage('')
  }
  
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setReceivedMessage(data.message)
      setRoom(data.room)
    })
  }, [socket])
  
  return (
    <>
        <div>
          <input type="text" placeholder='Room...' onChange={(e)=>setRoom(e.target.value)} value={room} />
          <button onClick={handleRoom}>Join Room</button>
          <h1>Room No.: {room}</h1>
          
          <input type="text" placeholder='Message...' onChange={(e)=>setMessage(e.target.value)} value={message}/>
          <button onClick={handleButton}>Send Message</button>
          <h1>Message: {receivedMessage}</h1>
          
        </div>
    </>
  )
}

export default App
