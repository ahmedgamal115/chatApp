const { default: dbConnection } = require("@/utility/dbConnection");
const { default: Users } = require("@/modules/userModel");
const { default: mongoose } = require("mongoose");
const { createRouter } = require("next-connect");

dbConnection()

const handelUsers = createRouter()

handelUsers.get(async(req,res)=>{
    try {
        const users = await Users.find({_id:{$ne: req.query.userId}}).select([
            "email",
            "username",
            "AvaterImage",
            "_id"
        ])
        return res.json(users)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})

export default handelUsers.handler()