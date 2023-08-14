import chatContainerStyle from '@/styles/chatContainer.module.css'
import { useEffect, useRef, useState } from 'react'
import Message from '../Message/Message'
import ChatInput from '../ChatInput/ChatInput'
import axios from 'axios'
import { addMessage, getAllMsg } from '@/utility/APIRoutes'


const ChatContainer = ({currentChat,currentUser,socket}) => {
    const [userChatAvater,setUserChatAvater] = useState(undefined)
    const [userChatUsername,setUserChatUsername] = useState(undefined)
    const [arraiveMessage,setArraiveMessage] = useState(null)
    const [chating,setChating] = useState([])
    const sendMsg = async(message)=>{
        const {data} = await axios.post(`${addMessage}`,{
            from:currentUser._id,
            to:currentChat._id,
            msg:message
        })
        if(data){
            socket.current.emit("send-message",{
                from:currentUser._id,
                to:currentChat._id,
                msg:message
            })
        }
        const msgs = [...chating]
        msgs.push({fromSelf:true , message:message})
        setChating(msgs)
    }
    useEffect(()=>{
        if(currentChat){
            setUserChatAvater(currentChat.AvaterImage)
            setUserChatUsername(currentChat.username)
        }
    },[currentChat])
    useEffect(()=>{
        const getChat = async() =>{
            const {data} = await axios.post(`${getAllMsg}`,{
                from: currentUser._id,
                to: currentChat._id
            })
            if(data){
                setChating(data)
            }
        }
        if(currentChat){
            getChat()
        }
    },[currentChat])
    useEffect(()=>{
        if(socket.current){
            socket.current.on("resieved-message",(msg)=>{
                setArraiveMessage({fromSelf:false , message:msg})
            })
        }
    },[])
    useEffect(()=>{
        if(arraiveMessage){
            const msgs = [...chating]
            msgs.push(arraiveMessage)
            setChating(msgs)
        }
    },[arraiveMessage])
  return (
    <div className={chatContainerStyle.container}>
        <div className={chatContainerStyle.userChat}>
            <div className={chatContainerStyle.avater}>
                <img src={`data:image/svg+xml;base64,${userChatAvater}`} alt="avater" />
            </div>
            <div className={chatContainerStyle.username}>
                <h3>{userChatUsername}</h3>
            </div>
        </div>
        <div>
            <Message 
            currentChat = {currentChat} 
            currentUser = {currentUser} 
            chating={chating}/>
            <ChatInput sendMsg={sendMsg}/>
        </div>
    </div>
  )
}

export default ChatContainer