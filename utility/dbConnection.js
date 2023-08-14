const { default: mongoose } = require("mongoose");

const dbConnection = async() =>{
    try {
        await mongoose.connect("mongodb+srv://ahmedgamal10122000:War12345@cluster0.e9ozuww.mongodb.net/chat",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('DB Connection Successfuly')
    } catch (error) {
        console.log("Connection error " + error)
    }
}

export default dbConnection