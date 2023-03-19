import { useEffect, useState } from 'react'
import io from 'socket.io-client';
import './App.css'

const socket = io('http://localhost:3000');

function App() {
  const [textFromAnotherUser, setFromAnotherUser] = useState('')
  const [text, setText] = useState('')
  const [roomCode, setRoomCode] = useState('')

  useEffect(() => {
    socket.on('messageFromAnotherUser', data => {
      setFromAnotherUser(data)
    })
  }, [])

  return (
    <>
      <input onChange={(e) => {
        setRoomCode(e.target.value)
      }}></input>
      <button onClick={() => {
        [
          socket.emit('enterCode', roomCode)
        ]
      }}>SubmitRoomCode</button>
      <input onChange={(e) => {
        setText(e.target.value)
      }}></input>
      <button onClick={() => {
        [
          socket.emit('messageFromFront', {
            message: text,
            code: roomCode
          })
        ]
      }}>Submit</button>
      {
        textFromAnotherUser
      }
    </>
  )
}

export default App
