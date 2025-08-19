const mongoose = require('mongoose');
require('dotenv').config()
exports.connectDB =async () => {
    try{
        const connectStatus = await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connection successful " , connectStatus.connections[0].host);
        
    }catch(error){
        console.log("error from database connection" , error)
    }
}