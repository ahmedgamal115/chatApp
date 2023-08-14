const { default: dbConnection } = require("@/utility/dbConnection");
const { default: Users } = require("@/modules/userModel");
const { default: mongoose } = require("mongoose");
const { createRouter } = require("next-connect");
const bcrypt = require('bcrypt');

dbConnection()

const handelUsers = createRouter()

handelUsers.post(async(req,res)=>{
    try {
        const {Username,Password} = req.body
        const checkUsername = await Users.findOne({username:Username})
        if(!checkUsername)
            return res.json({msg:"Incorrect user or password",status:false})
        const isPasswordvalid = await bcrypt.compare(Password,checkUsername.password)
        if(!isPasswordvalid)
            return res.json({msg:"Incorrect user or password",status:false})
        delete checkUsername.password
        return res.json({status:true,checkUsername})
    } catch (error) {
        console.log(error)
    }
})

export default handelUsers.handler()