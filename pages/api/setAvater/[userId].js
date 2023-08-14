const { default: dbConnection } = require("@/utility/dbConnection");
const { default: Users } = require("@/modules/userModel");
const { default: mongoose } = require("mongoose");
const { createRouter } = require("next-connect");

dbConnection()

const handelUsers = createRouter()

handelUsers.post(async(req,res)=>{
    try {
        const userId = req.query.userId
        const {image} = req.body
        const userData = await Users.findByIdAndUpdate(userId,{
            isAvaterActive: true,
            AvaterImage: image
        },{
            new: true,
            upsert: true,
        })
        return res.json({
            isSet: userData.isAvaterActive,
            image: userData.AvaterImage
        })
    } catch (error) {
        console.log(error)
    }
})

export default handelUsers.handler()