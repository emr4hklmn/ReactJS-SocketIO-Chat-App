
import React, { useState } from 'react'

const ChatPanel = (props) => {
    const {socket,userName,room}=props
    
    
    
  return (
    <div >
     <div className="chat-header">
        <h4>Live Chat</h4>
     </div>
     <div className="chat-body"></div>
     <div className="chat-footer"></div>

    </div>
  )
}

export default ChatPanel