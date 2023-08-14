const { default: messages } = require("@/modules/messages");
const { default: dbConnection } = require("@/utility/dbConnection");
const { createRouter } = require("next-connect");

dbConnection()

const handelMsg = createRouter()

handelMsg.post(async(req,res)=>{
    try {
        const {from,to} = req.body
        const massage = await messages.find(
            {
                users: {$all:[from,to] }
            }).sort({updatedAt:1})
        const handelData = massage.map(msg=>{
            return({
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            })
        })
        return res.json(handelData)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})

export default handelMsg.handler()