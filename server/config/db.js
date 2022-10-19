
const mongoose = require("mongoose");
const {URL} = require("./envConfig");

const connect = async() =>{
    try {
        await mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology: true})
        console.log("DB connected successfully");
    } catch (error) {
        console.log("DB connection failed ");
    }
}

module.exports = connect;