import './App.css';
import React, { useState } from 'react'
import socket_io_sever from "socket.io-client"
import ChatPanel from './components/ChatPanel';

function App() {
  const socket=socket_io_sever.connect("http://localhost:3001")

  const [userName,setUserName]=useState("")
  const [room,setRoom]=useState("")

  const joinRoom=()=>{
if(userName && room){
     socket.emit("join_room",room)
}else{
  alert("doldur them")
}
  }
  function getUserData(e){
      const whichData=e.target.name
  const value=e.target.value;

      if(whichData==="user"){
          setUserName(value)
      }else if(whichData==="room"){
          setRoom(value)
      }
  }

  
return (
  <div className='chat-panel'>
      <h3>Join A Chat</h3>
      {/* <h1>{userName}</h1>
      <h2>{room}</h2> */}
      <input type="text" name="user" placeholder='john..' onChange={getUserData} />
      <input type="text" name="room" placeholder='Room ID..' onChange={getUserData} />
      <button onClick={joinRoom}>Joimn A room</button>
      <ChatPanel socket={socket} userName={userName} room={room} />

  </div>
)
}

export default App
