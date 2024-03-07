
import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

const ChatPanel = (props) => {
    const {socket,username,room}=props
    const [currentMessage,setCurrentMessage]=useState("")
    const [chatData,setChatData]=useState([])
  function handleCurrentMessage(e){
    const value=e?.target?.value
    setCurrentMessage(value)
  }
 async function sendMessage(){
    if(currentMessage){
        const messageData={
          roomNumber:room,
          author:username,
          message:currentMessage,
          time :new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_message",messageData)
        
        // setChatData(prev=>[...prev,messageData])
        setCurrentMessage("")
    }
    
  }
    useEffect(()=>{
      socket.on("receive_message",(data)=>{
        console.log("data new",data)
        setChatData(prev=>[...prev,data])
      })
    },[socket])
    
  return (
    <div className="chat-window">
    <div className="chat-header">
      <p>Live Chat</p>
    </div>
    <div className="chat-body">
      <ScrollToBottom className="message-container">
        {chatData?.map(({time,author,username,message}) => {
          return (
            <div
            key={time}
              className="message"
              id={username === author ? "you" : "other"}
            >
              <div className='message-panel'>
                <div className="message-content">
                  <p>{message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{time}</p>
                  <p id="author">{author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
    </div>
    <div className="chat-footer">
      <input
        type="text"
        value={currentMessage}
        placeholder="Hey..."
        onChange={(e) => {
          handleCurrentMessage(e);
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && sendMessage();
        }}
      />
      <button onClick={sendMessage}>&#9658;</button>
    </div>
  </div>
  )
}

export default ChatPanel