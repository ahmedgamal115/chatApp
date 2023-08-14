import welcomeStyle from '@/styles/welcome.module.css'
import { useEffect, useState } from 'react'

const Welcome = ({currentUser}) => {
    const [currentUsername,setCurrentUsername] = useState(undefined)
    useEffect(()=>{
        if(currentUser){
            setCurrentUsername(currentUser.username)
        }
    },[currentUser])
  return (
    <div className={welcomeStyle.container}>
        <img src={'images/gifs/welcome.gif'} alt="" />
        <p>Welcome <span>{currentUsername}</span></p>
        <p>Let's start chating</p>
    </div>
  )
}


export default Welcome