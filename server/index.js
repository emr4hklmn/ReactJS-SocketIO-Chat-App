const express=require("express")
const app=express();
const http=require("http");
const cors=require("cors")
const {Server}=require("socket.io");

app.use(cors())


const server=http.createServer(app)
const socket_io_server=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

socket_io_server.on("connection",(socket)=>{
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });
      socket.on("send_message", (data) => {
        console.log("data",data)
        socket.to(data.room).emit("receive_message", data);
      })
      socket.on("disconnect",(socket)=>{
        console.log("user Disconnected",socket.id)
    })
    // console.log(`User Connected: ${socket.id}`)
})




server.listen(3001,()=>{
    console.log("SERVER RUNNING")
})
