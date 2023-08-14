import ChatInputStyle from '@/styles/ChatInput.module.css'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from 'react'
import {BiSolidWinkSmile} from 'react-icons/bi'
import {IoMdSend} from 'react-icons/io'

const ChatInput = ({sendMsg}) => {
  const [showEmojiPicker,setShowEmojiPicker] = useState(false)
  const [msg,setMsg] = useState(undefined)
  const handelShowEmojiPicker = async()=>{
    setShowEmojiPicker(!showEmojiPicker)
  }
  const addEmoji = (e) => {
    let message = msg
    message += e.native
    setMsg(message)
  }
  const handelSendData = (e) =>{
    e.preventDefault()
    if(msg.length > 0){
      sendMsg(msg)
      setMsg('')
    }
  }
  return (
    <div className={ChatInputStyle.container}>
        <div className={ChatInputStyle.emoji}>
            <BiSolidWinkSmile onClick={()=>{handelShowEmojiPicker()}}/>
            {
              showEmojiPicker?(
                <div className={ChatInputStyle.EmojiPickerReact}>
                  <Picker 
                    data={data}
                    onEmojiSelect={addEmoji}
                    theme="dark"
                  />
                </div>
              ):''
            }
        </div>
        <form onSubmit={(e)=>{handelSendData(e)}} className={ChatInputStyle.inputForm}>
            <input type="text" 
            placeholder='type your message here'
            value={msg || ''} 
            onChange={(e)=>{setMsg(e.target.value)}}/>
            <button className={ChatInputStyle.submitBtn}>
                <IoMdSend/>
            </button>
        </form>
    </div>
  )
}

export default ChatInput