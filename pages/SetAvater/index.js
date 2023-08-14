import avaterStyle from '@/styles/serAvater.module.css'
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { setAvaterToUser } from '@/utility/APIRoutes';

const SetAvater = () => {
    const api = 'https://api.multiavatar.com/45678945'
    const [avater,setAvater] = useState([])
    const [isLoader,setIsLoader] = useState(true)
    const [selectAvater,setSelectAvater] = useState(undefined)
    const router = useRouter()
    const toastOption = {
        position:'bottom-right',
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }
    const setProfilePic = async ()=>{
        if(selectAvater == undefined){
            toast.error(
                "Please select profile avater",
                toastOption
            )
        }else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const {data} = await axios.post(`${setAvaterToUser}/${user._id}`,{
                image:avater[selectAvater]
            })
            if(data.isSet){
                user.isAvaterActive = true
                user.AvaterImage = data.image
                localStorage.setItem("chat-app-user", JSON.stringify(user))
                router.push('/chat')
            }
            else{
                toast.error(
                    "Error setting in upload image",
                    toastOption
                )
            }
        }
    }
    const fetchAvater = async () =>{
        const data = new Array()
        for (let index = 0; index < 4; index++) {
            try {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = new Buffer(image.data)
                data.push(buffer.toString("base64"))
            } catch (error) {
                console.log(error)
            }
        }
        setAvater(data)
        setIsLoader(false)
    }
    useEffect( ()=>{
        fetchAvater()
        if(!localStorage.getItem("chat-app-user")){
            router.push('/Login')
        }
    },[])
  return (
    <>
    {
        isLoader ? (
            <>
                <div className={avaterStyle.continer}>
                    <img src={'images/loader/3WyW.gif'} alt="" />
                </div>
            </>
        )
        :
        <div className={avaterStyle.continer}>
            <div className={avaterStyle.title}>Pick your faveorit avater </div>
            <div className={avaterStyle.avaters}>
                {
                    avater.map((avaterImg,index)=>{
                        return(
                            <div 
                            key={index} 
                            className={`${avaterStyle.avater} 
                            ${selectAvater === index ? avaterStyle.selected : ''}`}>
                                <img src={`data:image/svg+xml;base64,${avaterImg}`} alt="avater"
                                onClick={()=>{setSelectAvater(index)}} />
                            </div>
                        )
                    })
                }
            </div>
            <div className={avaterStyle.SelectAvaterBtn}>
                <button onClick={()=>{setProfilePic()}}>Set as Profile</button>
            </div>
        </div>
    }
    <ToastContainer/>
    </>
  )
}

export default SetAvater
