import messageStyle from '@/styles/message.module.css'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Message = ({chating,currentChat,currentUser}) => {
  const [msgs,setMsgs] = useState([])
  const scrollRef = useRef()
  const [senderAvatar,setSenderAvatar] = useState(undefined)
  const [resiverAvater,setResiverAvater] = useState(undefined)
  useEffect(()=>{
    if(chating){
      setMsgs(chating)
    }
  },[chating])
  useEffect(()=>{
    if(currentUser){
      setResiverAvater(currentChat.AvaterImage)
      setSenderAvatar(currentUser.AvaterImage)
    }
  },[currentChat])
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[msgs])
  return (
    <div className={messageStyle.container}>
        {msgs.map((message)=>{
          return(
            <div 
            ref={scrollRef}
            key={uuidv4()} 
            className={`${messageStyle.content} 
              ${message.fromSelf ? 
              messageStyle.transemit : 
              messageStyle.resived}`}>
                <div className={messageStyle.avater}>
                  <img src={`${message.fromSelf ?
                  `data:image/svg+xml;base64,${senderAvatar}`:
                  `data:image/svg+xml;base64,${resiverAvater}`}`} alt="" />
                </div>
                <div className={messageStyle.message}>
                  <p>{message.message}</p>
                </div>
            </div>
          )
        })}
    </div>
  )
}

export default Message