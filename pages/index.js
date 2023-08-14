import dbConnection from "@/utility/dbConnection"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

dbConnection()

export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      router.push("/chat")
    }else{
      router.push("/Login")
    }
  },[])
  return (
    <>
      <div>chat App</div>
    </>
  )
}
