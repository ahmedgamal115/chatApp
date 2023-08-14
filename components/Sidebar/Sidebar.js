import sidebarStyle from '@/styles/sidebar.module.css'
import { useEffect, useState } from 'react'
import Head from 'next/head'

const Sidebar = ({contacts,newChat,barState}) => {
  const [contactsUser,setContactsUser] = useState([])
  const [userSelect,setUserSelect] = useState(undefined)
  const [minbar,setMinbar] = useState(false)
  useEffect(()=>{
    if(contacts){
      setContactsUser(contacts)
    }
  },[contacts])
  const handelUserChating = (index,userData)=>{
    setUserSelect(index)
    newChat(userData)
  }
  const handelMinbar = ()=>{
    setMinbar(!minbar)
    barState(!minbar)
  }
  return (
    <div className={sidebarStyle.container}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Rubik+Wet+Paint&display=swap" rel="stylesheet"/>
      </Head>
        <div 
        style={{padding:`${minbar ? '0 10px' : '0 40px'}`}} 
        onClick={()=>{handelMinbar()}} 
        className={sidebarStyle.logo}>
          <div className={sidebarStyle.title}>
          {minbar ? 
            <span><img style={{width:`${minbar ? '50px' : ''}`,
          height:`${minbar ? '50px' : ''}`}} src={'images/logo/logomakerr.ai_edit (1) copy.png'} alt="" /></span>
          :
          <>
            Chat<span><img src={'images/logo/logomakerr.ai_edit (1) copy.png'} alt="" /></span>phere
          </>
        }
          </div>
        </div>
        <div className={sidebarStyle.contacts}>
          {contactsUser ?
          contactsUser.map((contact,index)=>{
            return(
              <div key={contact._id} 
              style={{justifyContent:`${minbar ? 'center' : ''}`,padding:`${minbar ? '0 10px' : ''}`}}
              className={`${sidebarStyle.user} 
              ${index === userSelect ? sidebarStyle.selected : ''}`}
              onClick={()=>{handelUserChating(index,contact)}}>
                <div className={sidebarStyle.avater}
                style={{width:`${minbar ? 'fit-content' : ''}`}}>
                  <img src={`data:image/svg+xml;base64,${contact.AvaterImage}`} alt="avater" />
                </div>
                {minbar ? '' : 
                <div className={sidebarStyle.username}>
                  {contact.username}
                </div>
                }
              </div>
            )
          })
          :''}
        </div>
    </div>
  )
}

export default Sidebar