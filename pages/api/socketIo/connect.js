const { Server } = require("socket.io");
import cors from "cors";
const { createRouter } = require("next-connect");


const corsMiddleware = cors();
const onlianUser = new Map()
const SocketHandler = createRouter()

SocketHandler.all( async(req, res) =>{
    try {
        const io = new Server(res.socket.server, {
            path: "/api/socketIo/connect",
            addTrailingSlash: false
        });
        io.on("connection",(socket)=>{
            socket.on("add-user",(userId)=>{
                console.log(userId)
                onlianUser.set(userId,socket.id)
            })
            socket.on("send-message",(data)=>{
                const sendUserSocket = onlianUser.get(data.to)
                if(sendUserSocket){
                    socket.to(sendUserSocket).emit("resieved-message",data.msg)
                }
            })
        })
        corsMiddleware(req, res, () => {
            res.socket.server.io = io;
            res.end();
        });
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})

export default SocketHandler.handler()