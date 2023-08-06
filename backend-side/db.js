const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://Aditya:Adityajangra@cluster0.u0p7auh.mongodb.net/inotebook?retryWrites=true&w=majority"
const mongoURI = "mongodb://localhost/inotebook"

const connectToMongo = async()=>{
    await mongoose.connect(mongoURI).then(()=>{
        console.log("Connection succesfull");
    }).catch(()=>{
        console.log("no connection")
    })
}

module.exports = connectToMongo; 