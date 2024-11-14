const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/dd";



const connectToMongo = async ()=>{
    try{
    await mongoose.connect(mongoURI)
        console.log("connected to mongo successfully");
    
}catch(error){
    console.error("dddd");
    process.exit(0);

}

};

module.exports = connectToMongo;
