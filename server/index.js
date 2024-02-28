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
    console.log("socket.io",socket.id)
})

socket_io_server.on("disconnect",(socket)=>{
    console.log("user Disconnected",socket.id)
})

server.listen(3001,()=>{
    console.log("SERVER RUNNING")
})
