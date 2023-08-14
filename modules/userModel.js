const { default: mongoose } = require("mongoose");

const userShcema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique: true
    },
    email:{
        type:String,
        require:true,
        max:50,
        unique: true
    },
    password:{
        type:String,
        require:true,
        min:8,
        max:50
    },
    isAvaterActive:{
        type:Boolean,
        default:false
    },
    AvaterImage:{
        type:String,
        default:""
    }
})


export default mongoose.models.Users || mongoose.model('Users',userShcema)