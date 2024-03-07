
import React, { useState } from 'react'

const ChatPanel = (props) => {
    const {socket,userName,room}=props
    const [currentMessage,setCurrentMessage]=useState("")
  
  function handleCurrentMessage(e){
    const value=e?.target?.value
    setCurrentMessage(value)
  }
 async function sendMessage(){
    if(currentMessage){
        const messageData={
          room,
          userName,
          message:currentMessage,
          time :new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_message",messageData)
        setCurrentMessage("")
    }
    
  }
    
    
  return (
    <div >
     <div className="chat-header">
        <h4>Live Chat</h4>
     </div>
     <div className="chat-body"></div>
     <div className="chat-footer">
      <input value={currentMessage} onChange={(e)=>handleCurrentMessage(e)} type="text" placeholder='Hey...'/>
      <button onClick={sendMessage} >&#9658;</button>
     </div>

    </div>
  )
}

export default ChatPanel