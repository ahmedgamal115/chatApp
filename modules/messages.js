const { default: mongoose } = require("mongoose");

const messagesSchema = mongoose.Schema(
    {
        message : {
            text:{
                type:String,
                required: true
            },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true
        },
    },
    {
        timestamps:true,
    }
)

export default mongoose.models.Messages || mongoose.model('Messages',messagesSchema)