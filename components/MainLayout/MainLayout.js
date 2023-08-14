import layoutStyle from '@/styles/Layout.module.css'
import { CreateNewUser, checkLogin } from '@/utility/APIRoutes';
import axios from 'axios';
import { motion } from 'framer-motion';
import range from 'lodash/range'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Dots = ({ count, active }) => (
  <div className={layoutStyle.dot_container}
    style={{left:`${100-(5*count)}%`}}
  >
    {range(count).map(i => (
      <motion.div
        key={i}
        className={layoutStyle.dot}
        initial={false}
        animate={{
          width: active === i ? 15 : 10,
          scale: active === i ? 1.2 : 1,
          opacity: active === i ? 1 : 0.5,
        }}
      />
    ))}
  </div>
)



const MainLayout = (props) => {
  const router = useRouter()
  const [imageActive,setImageActive] = useState(0)
  const images = ["images/slog/chat1.jpg","images/slog/chat2.jpg"]
  const [signupData,setSignupData] = useState({
    "Username":'',
    "Email":'',
    "Password":'',
    "ConformPassword":''
  })
  const [loginData,setLoginData] = useState({
    "Username":'',
    "Password":''
  })
  const toastOption = {
    position:'bottom-right',
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }
  const handleValue = (e) =>{
    setSignupData({...signupData,[e.target.name]:e.target.value})
  }
  const handelLoginValue = (e) =>{
    setLoginData({...loginData,[e.target.name]:e.target.value})
  }
  const handleValidation = () =>{
    const {Username,Email,Password,ConformPassword} = signupData
    if(Username.length < 3){
      toast.error(
        "Username must be greater then 3 letter",
        toastOption
      )
      return false
    }else if(Email === ''){
      toast.error(
        "Email is require please enter your email",
        toastOption
      )
      return false
    }else if(Password.length < 8){
      toast.error(
        "Password must be greater then 8 letter",
        toastOption
      )
      return false
    }else if(Password !== ConformPassword){
      toast.error(
        "Password not matched please check password and conformation",
        toastOption
      )
      return false
    }else{
      return true
    }
  }
  const handelValidationLogin = ()=>{
    const {Username,Password} = loginData
    if(Username === ''){
      toast.error(
        "Username is require",
        toastOption
      )
      return false
    }else if(Password === ''){
      toast.error(
        "Password is require",
        toastOption
      )
      return false
    }else{
      return true
    }

  }
  const handelCreateNewAccount = async(e) =>{
    e.preventDefault()
    if(handleValidation()){
      const {Username,Email,Password} = signupData
      const {data} = await axios.put(CreateNewUser,{
        Username,
        Email,
        Password
      })
      if(data.status === false){
        toast.error(
          data.msg,
          toastOption
        )
      }
      if(data.status === true){
        localStorage.setItem("chat-app-user", JSON.stringify(data.user))
        router.push('/')
      }
    }
  }
  const handelLogin = async(e)=>{
    e.preventDefault()
    if(handelValidationLogin()){
      const {Username,Password} = loginData
      const {data} = await axios.post(checkLogin,{
        Username,
        Password
      })
      if(data.status === false){
        toast.error(
          data.msg,
          toastOption
        )
      }
      if(data.status === true){
        localStorage.setItem("chat-app-user", JSON.stringify(data.checkUsername))
        router.push('/')
      }
    }
  }
  const handleImageSlider = () =>{
    if(imageActive === images.length - 1){
      setImageActive(0)
    }else{
      setImageActive(imageActive+1)
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      router.push({pathname:'/'})
    }
  },[])

  return (
    <>
    {props.state === "Login" ? 
      <div className={layoutStyle.container}>
        <div className={layoutStyle.slider}
        onClick={()=>{handleImageSlider()}}>
            {
              images.map((link,index)=>{
                return(
                  <img key={index} src={link} alt="" style={{transform:`translateX(${-595*imageActive}px)`}}  />
                )
              })
            }
            
            <Dots count={images.length} active={imageActive} />
        </div>
        <div className={layoutStyle.content}>
            <div className={layoutStyle.logo}><img src="images/logo/logomakerr.ai_edit (1) copy.png" alt="" /></div>
            <div className={layoutStyle.pageTitle}>LOGIN</div>
            <form onSubmit={(e)=>{handelLogin(e)}} className={layoutStyle.formContent}>
              <div className={layoutStyle.username}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill='white' height="18px" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                <input onChange={handelLoginValue} name='Username' placeholder='Username' type="text" />
              </div>
              <div className={layoutStyle.password}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill='white' height="18px" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
                <input onChange={handelLoginValue} name='Password' placeholder='Password' type="password" />
              </div>
              <div className={layoutStyle.control}>
                <span>Forget password?</span>
                <input type="submit" />
              </div>
            </form>
            <ToastContainer/>
            <div className={layoutStyle.list}>
              <div className={`${layoutStyle.elementList} ${layoutStyle.active}`}>
                <span><Link href={"/Login"}>Login</Link></span>
              </div>
              <div className={`${layoutStyle.elementList}`}>
                <span><Link href={"/Signup"}>Sign up</Link></span>
              </div>
            </div>
        </div>
      </div>
    :
    <div className={layoutStyle.container}>
        <div className={layoutStyle.slider}
        onClick={()=>{handleImageSlider()}}>
            {
              images.map((link,index)=>{
                return(
                  <img key={index} src={link} alt="" style={{transform:`translateX(${-595*imageActive}px)`}}  />
                )
              })
            }
            
            <Dots count={images.length} active={imageActive} />
            
        </div>
        <div className={layoutStyle.content}>
            <div className={layoutStyle.pageTitle}>Sign up</div>
            <form onSubmit={(e)=>{handelCreateNewAccount(e)}} className={layoutStyle.formContent}>
              <div className={layoutStyle.username}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill='white' height="18px" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                <input onChange={handleValue} name='Username' placeholder='Username' type="text" />
              </div>
              <div className={layoutStyle.email}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill='white' height="18px" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                <input onChange={handleValue} name='Email' placeholder='Email' type="text" />
              </div>
              <div className={layoutStyle.password}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill='white' height="18px" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
                <input onChange={handleValue} name='Password' placeholder='Password' type="password" />
              </div>
              <div className={layoutStyle.conform}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill='white' height="18px" viewBox="0 0 448 512"><path d="M224 64c-44.2 0-80 35.8-80 80v48H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80V144C80 64.5 144.5 0 224 0c57.5 0 107 33.7 130.1 82.3c7.6 16 .8 35.1-15.2 42.6s-35.1 .8-42.6-15.2C283.4 82.6 255.9 64 224 64zm32 320c17.7 0 32-14.3 32-32s-14.3-32-32-32H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h64z"/></svg>
                <input onChange={handleValue} name='ConformPassword' placeholder='Conform Password' type="password" />
              </div>
              <div className={layoutStyle.control}>
                <input type="submit" value={"Create"} />
              </div>
            </form>
            <ToastContainer/>
            <div className={layoutStyle.list}>
              <div className={`${layoutStyle.elementList}`}>
                <span><Link href={"/Login"}>Login</Link></span>
              </div>
              <div className={`${layoutStyle.elementList} ${layoutStyle.active}`}>
                <span><Link href={"/Signup"}>Sign up</Link></span>
              </div>
            </div>
        </div>
      </div>
    }
    </>
  )
}

export default MainLayout