import ChatContainer from '@/components/ChatContainer/ChatContainer'
import Navbar from '@/components/Navbar/Navbar'
import Sidebar from '@/components/Sidebar/Sidebar'
import Welcome from '@/components/Welcome/Welcome'
import chatStyle from '@/styles/chat.module.css'
import { getAllUsers, host, hostSocket, socketApi } from '@/utility/APIRoutes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { io }  from 'socket.io-client'


const chat = () => {
    const router = useRouter()
    const [contacts,setContacts] = useState([])
    const [currentUser,setCurrentUser] = useState(undefined)
    const [currentChat,setCurrentChat] = useState(undefined)
    const [minbar,setMinbar] = useState(false)
    const [isLoader,setIsLoader] = useState(true)
    const socket = useRef()
    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            setIsLoader(false)
            router.push('/Login')
        }else{
            setIsLoader(false)
            const getUserData = async() =>{
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
            }
            getUserData()
        }
    },[])
    useEffect(()=>{
        if(currentUser){
            if(currentUser.isAvaterActive){
                setIsLoader(false)
                const fetchUserContent = async()=>{
                    const {data} = await axios.get(`${getAllUsers}/${currentUser._id}`)
                    setContacts(data)
                }
                fetchUserContent()
            }else{
                setIsLoader(false)
                router.push('/SetAvater')
            }
        }
    },[currentUser])
    useEffect(()=>{
        const socketInlization = async(user)=>{
            await axios.all("http://localhost:3000/api/socketIo/connect")
            socket.current = io({path:"/api/socketIo/connect"})
            socket.current.emit('connection');
            socket.current.emit('add-user', user._id)
        }
        if(currentUser){
            socketInlization(currentUser)
        }
    },[currentUser])
    const handelChangeChat = (chat) =>{
        setCurrentChat(chat)
    }
    
  return (
    <>
    {isLoader ? 
        <>
            <div className={chatStyle.continer}>
                <img src={'images/loader/3WyW.gif'} alt="" />
            </div>
        </>
    :
        <div style={{gridTemplateColumns:`${minbar ? '10% 90%' : '25% 75%'}`}} className={chatStyle.continer}>
            <Sidebar barState = {setMinbar} contacts={contacts} newChat={handelChangeChat}/>
            <div className={chatStyle.content}>
                <Navbar currentUser={currentUser}/>
                {!currentChat ? 
                (
                    <Welcome currentUser={currentUser}/>
                ):
                (
                    <ChatContainer 
                    currentChat = {currentChat} 
                    currentUser = {currentUser}
                    socket = {socket}/>
                )}
            </div>
        </div>
    }
    </>
  )
}

export default chat