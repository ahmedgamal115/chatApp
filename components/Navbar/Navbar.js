import navbarStyle from '@/styles/navbar.module.css'
import { useEffect, useState } from 'react'
import {FiLogOut} from 'react-icons/fi'

const Navbar = ({currentUser}) => {
  const [currentUsername,setCurrentUsername] = useState(undefined)
  const [currentUserImage,setCurrentUserImage] = useState(undefined)
  useEffect(()=>{
    if(currentUser){
      setCurrentUsername(currentUser.username)
      setCurrentUserImage(currentUser.AvaterImage)
    }
  },[currentUser])
  const handelLogout = ()=>{
    localStorage.clear()
    window.location.href = '/'
  }
  return (
    <div className={navbarStyle.container}>
        <div className={navbarStyle.iconController}>
          <FiLogOut onClick={()=>{handelLogout()}} className={navbarStyle.logout}/>
        </div>
        <div className={navbarStyle.profile}>
          <div className={navbarStyle.username}>
            {currentUsername}
          </div>
          <div className={navbarStyle.avater}>
            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
          </div>
        </div>
    </div>
  )
}

export default Navbar
