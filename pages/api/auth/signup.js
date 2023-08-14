const { default: dbConnection } = require("@/utility/dbConnection");
const { default: Users } = require("@/modules/userModel");
const { default: mongoose } = require("mongoose");
const { createRouter } = require("next-connect");
const bcrypt = require('bcrypt');

dbConnection()

const handelUsers = createRouter()

handelUsers.put(async(req,res)=>{
    try {
        const {Username,Email,Password} = req.body
        const checkUsername = await Users.findOne({username:Username})
        if(checkUsername)
            return res.json({msg:"Username already used",status:false})
        const checkEmail = await Users.findOne({email:Email})
        if(checkEmail)
            return res.json({msg:"Email already used",status:false})
        const hashPassword = await bcrypt.hash(Password, 10);
        const user = new Users({
            username:Username,
            email:Email,
            password: hashPassword
        })
        try {
            await user.save()
            delete user.password
            return res.json({status:true,user})
        } catch (error) {
            console.log(error)
            return res.json({msg:"happen error when insert user",status:false}) 
        }
        
    } catch (error) {
        console.log(error)
    }
})

export default handelUsers.handler()
