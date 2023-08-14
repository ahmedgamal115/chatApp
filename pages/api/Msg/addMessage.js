const { default: messages } = require("@/modules/messages");
const { default: dbConnection } = require("@/utility/dbConnection");
const { createRouter } = require("next-connect");

dbConnection()

const handelMsg = createRouter()

handelMsg.post(async(req,res)=>{
    try {
        const {from,to,msg} = req.body
        const copyMsg = new messages({
            message:{text:msg},
            users:[from,to],
            sender: from
        })
        try {
            await copyMsg.save()
            return res.json({msg:"message is successful added."})
        } catch (error) {
            console.log(error)
            return res.json({msg:"Error happen when added message"})
        }
    } catch (error) {
        console.log(error)
    }
})

export default handelMsg.handler()